**MDKVA SurahKit** is a lightweight, browser-ready Quran Surah loader designed for multilingual web and mobile applications.
It provides a clean and unified API for retrieving Surahs from any supported language, perfect for Islamic apps, educational tools, spiritual platforms, mobile apps, and multilingual UI development.

---

## **✨ Features**

* **`SurahKit.loadAll(language)`** — Load the full Surah dataset for a language.
* **`SurahKit.searchById(language, id)`** — Retrieve a Surah using its unique ID (string-safe; supports `"1"`, `"3b"`, `"2c"`, etc.).
* **`SurahKit.searchByName(language, keyword)`** — Find Surahs by name (e.g., “mankind”).
* **`SurahKit.searchByPhrase(language, phrase)`** — Search Surah text for any phrase.
* Works with **any language**, as long as a JSON file exists.
* **Simple, predictable JSON structure**:
* **Zero dependencies**, fully ES module compatible.

---

## **📦 Installation**

SurahKit is browser-first. You can load it via file path, CDN, or module bundlers.

### **CDN import (recommended):**

```html
<script type="module">
  import { SurahKit } from "https://cdn.jsdelivr.net/npm/@mdkva/surahkit/surahkit.js";
</script>
```

---

## **🌐 Usage**

## **SurahKit.loadAll(language)**
```html
<div id="mdkva-surahkit"></div>

<script type="module">

import { SurahKit } from "https://cdn.jsdelivr.net/npm/@mdkva/surahkit/surahkit.js";

  async function loadAll() {
    try {
      // Load the full dataset for English
      const allSurahs = await SurahKit.loadAll("english");

      console.log("load:", allSurahs);

      // Build HTML list of surahs
      const html = allSurahs.map(s => `
        <div class="surah-block">
          <h3>${s.id}: ${s.surah}</h3>
          <p><strong>Total Verses:</strong> ${s.verses}</p>
          <p>${s.text}</p>
          <hr>
        </div>
      `).join('');

      document.getElementById("mdkva-surahkit").innerHTML = html;

    } catch (err) {
      console.error("Error in load():", err);
      document.getElementById("mdkva-surahkit").innerText = err.message;
    }
  }

  loadAll();
</script>
```

---

## **SurahKit.searchById(language, id)**
```html
<div id="mdkva-surahkit"></div>

<script type="module">

import { SurahKit } from "https://cdn.jsdelivr.net/npm/@mdkva/surahkit/surahkit.js";

  async function searchById() {
    try {
      const surah = await SurahKit.searchById("english", "36");

      document.getElementById("mdkva-surahkit").innerHTML = `
        <h2>${surah.id}: ${surah.surah}</h2>
        <p><strong>Total Verses:</strong> ${surah.verses}</p>
        <p>${surah.text}</p>
      `;
    } catch (err) {
      console.error(err);
      document.getElementById("mdkva-surahkit").innerText = err.message;
    }
  }

  searchById();
</script>
```

---

## **SurahKit.searchByName(language, keyword)**
```html
<div id="mdkva-surahkit"></div>

<script type="module">

import { SurahKit } from "https://cdn.jsdelivr.net/npm/@mdkva/surahkit/surahkit.js";

  async function searchByName() {
    try {
      // Search for surahs containing "Mankind" in the name
      const results = await SurahKit.searchByName("english", "mankind");

      console.log("searchByName:", results);

      if (results.length === 0) {
        document.getElementById("mdkva-surahkit").innerText = "No surahs found.";
        return;
      }

      const html = results.map(s => `
        <div class="surah-block">
          <h3>${s.id}: ${s.surah}</h3>
          <p><strong>Total Verses:</strong> ${s.verses}</p>
          <p>${s.text}</p>
          <hr>
        </div>
      `).join('');

      document.getElementById("mdkva-surahkit").innerHTML = html;

    } catch (err) {
      console.error("Error in searchByName():", err);
      document.getElementById("mdkva-surahkit").innerText = err.message;
    }
  }

  searchByName();
</script>
```

---

## **SurahKit.searchByPhrase(language, phrase)**
```html
<div id="mdkva-surahkit"></div>

<script type="module">

import { SurahKit } from "https://cdn.jsdelivr.net/npm/@mdkva/surahkit/surahkit.js";

  async function searchByPhrase() {
    try {
      // Search for the phrase "We have granted you a clear triumph" in surah text
      const results = await SurahKit.searchByPhrase("english", "We have granted you a clear triumph");

      console.log("search:", results);

      if (results.length === 0) {
        document.getElementById("mdkva-surahkit").innerText = "No matches found.";
        return;
      }

      const html = results.map(s => `
        <div class="surah-block">
          <h3>${s.id}: ${s.surah}</h3>
          <p><strong>Total Verses:</strong> ${s.verses}</p>
          <p>${s.text}</p>
          <hr>
        </div>
      `).join('');

      document.getElementById("mdkva-surahkit").innerHTML = html;

    } catch (err) {
      console.error("Error in searchByPhrase():", err);
      document.getElementById("mdkva-surahkit").innerText = err.message;
    }
  }

  searchByPhrase();
</script>
```

---

## Contributions
This project is open source and contributions are welcome!
* GitHub Repository: [https://github.com/mdkva/surahkit](https://github.com/mdkva/surahkit)
* Feel free to fork, submit issues, or create pull requests.

---

## Links
* **npm Package:** [https://www.npmjs.com/package/@mdkva/surahkit](https://www.npmjs.com/package/@mdkva/surahkit)
* **Company Website:** [mdkva.com](https://mdkva.com/)
* **Contact:** [contact@mdkva.com](mailto:contact@mdkva.com)

---

## **📄 License**

MIT License