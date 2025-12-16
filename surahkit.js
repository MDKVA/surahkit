const cache = new Map();

/**
 * @typedef {Object} SurahItem
 * @property {string} id - The Surah number (e.g., "1").
 * @property {string} surah - The name of the Surah (e.g., "The Opener").
 * @property {string} verses - The number of verses in the Surah (e.g., "7").
 * @property {string} text - The full translated text of the Surah.
 */

export const SurahKit = {
  /**
   * Load the full Surah dataset for a given language.
   * Implements concurrent fetch protection and caching.
   *
   * @param {string} language - The language file to load (e.g., 'english', 'arabic').
   * @returns {Promise<SurahItem[]>}
   */
  async loadAll(language) {
    if (!language) {
      throw new Error("Language is required.");
    }

    const safeLanguage = language.trim().toLowerCase();

    // 1. Check if an active Promise or the final data already exists in the cache
    if (cache.has(safeLanguage)) {
      return cache.get(safeLanguage);
    }

    // --- Start of Concurrent Fetch Protection Logic ---
    const fetchAndCachePromise = (async () => {
      try {
        const url = `https://cdn.jsdelivr.net/npm/@mdkva/surahkit/data/${safeLanguage}.json`;

        const res = await fetch(url);

        if (!res.ok) {
          // Improved Error Handling: include status code
          throw new Error(
            `Language file '${safeLanguage}.json' not found (Status: ${res.status}).`
          );
        }

        const data = await res.json();

        // 3. SUCCESS: Replace the active Promise in the cache with the actual data
        cache.set(safeLanguage, data);
        return data;

      } catch (error) {
        // 4. FAILURE: Remove the failed Promise from the cache to allow retries
        cache.delete(safeLanguage);
        throw error;
      }
    })();

    // 2. Store the Promise in the cache immediately to prevent duplicate fetches
    cache.set(safeLanguage, fetchAndCachePromise);

    return fetchAndCachePromise;
    // --- End of Concurrent Fetch Protection Logic ---
  },

  /**
   * Searches for a single Surah item by its ID (Surah number).
   *
   * @param {string} language - The language to search within.
   * @param {(string|number)} id - The ID (number) of the Surah.
   * @returns {Promise<SurahItem>}
   */
  async searchById(language, id) {
    if (!id) throw new Error("Surah ID is required.");

    const quran = await this.loadAll(language);
    const surahId = String(id).trim();

    /** @type {SurahItem | undefined} */
    const surah = quran.find(s => s.id === surahId);

    if (!surah) {
      throw new Error(`Surah with ID '${id}' not found in '${language}'.`);
    }

    return surah;
  },

  /**
   * Searches for multiple Surah items by their IDs.
   *
   * @param {string} language - The language to search within.
   * @param {Array<(string|number)>} ids - An array of Surah IDs to find.
   * @returns {Promise<SurahItem[]>}
   */
  async searchByIds(language, ids) {
    if (!ids || ids.length === 0) return [];

    const quran = await this.loadAll(language);

    // Convert IDs to a Set for O(1) average lookup time
    const idSet = new Set(ids.map(id => String(id).trim()));

    // Filter the list for items whose IDs are in the set
    return quran.filter(s => idSet.has(s.id));
  },

  /**
   * Searches for Surah items where the name includes the keyword (case-insensitive).
   *
   * @param {string} language - The language to search within.
   * @param {string} keyword - The search term for the Surah name.
   * @returns {Promise<SurahItem[]>}
   */
  async searchByName(language, keyword) {
    if (!keyword) return [];

    const quran = await this.loadAll(language);
    const term = keyword.toLowerCase();

    return quran.filter(s => s.surah.toLowerCase().includes(term));
  },

  /**
   * Searches for Surah items where the text includes the phrase (case-insensitive).
   *
   * @param {string} language - The language to search within.
   * @param {string} phrase - The search term for the Surah text.
   * @returns {Promise<SurahItem[]>}
   */
  async searchByPhrase(language, phrase) {
    if (!phrase) return [];

    const quran = await this.loadAll(language);
    const term = phrase.toLowerCase();

    return quran.filter(s => s.text.toLowerCase().includes(term));
  },

  /**
   * Clears the in-memory cache of all loaded datasets.
   * @returns {void}
   */
  clearCache() {
    cache.clear();
  },

  /* ------------------------------------------
   * OLD API (kept for backward compatibility)
   * ------------------------------------------ */

  // Old: surahKit.load(language)
  async load(language) {
    return this.loadAll(language);
  },

  // Old: surahKit.getById(language, id)
  async getById(language, id) {
    return this.searchById(language, id);
  },

  // Old: surahKit.search(language, phrase)
  async search(language, phrase) {
    return this.searchByPhrase(language, phrase);
  }
};

// camelCase convention... for those that don't prefer PascalCase
export const surahKit = SurahKit;