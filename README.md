# Ancient Egyptian Hieroglyphics Converter

Convert modern names into Ancient Egyptian hieroglyphics — with one-click copy, a curated documentary list, and a small photo gallery from Giza.

**Live demo:** https://hebarasmy.github.io/hieroglyphics-converter/

---

## Why I built this

While coding my dissertation I needed background noise, so I put on documentaries about Ancient Egypt. That harmless “white noise” turned into a full rabbit hole and a new hobby learning more about my country’s history. I added a handful of the videos I watched and some photos from Giza to share a bit of that journey.

The real itch to scratch: I wanted my **name in hieroglyphics** and I wanted to **copy the symbols** cleanly. Most sites only showed images or used loose mappings, so I built a tiny tool with two modes (a decorative cartouche style and a more phonetic, rule-based style) and one-click copy.

---

## Features

- **Two conversion styles**
  - **Cartouche** – fun, decorative “one symbol per letter”
  - **Phonetic** – closer to Middle Egyptian conventions (consonants only; includes a symbol breakdown)
- **Copy to clipboard** from the result card
- **Rotating Egypt facts** (shown at top and bottom)
- **Video Library** (curated seed list; opens on YouTube)
- **Photo Gallery** (Giza shots hosted in `/public`)
- Built as a **static site** and deployed to **GitHub Pages**

---

## Tech Stack

- **Next.js 15** (App Router, static export)
- **React 19**
- **Tailwind CSS**
- **lucide-react** for icons

---

## Getting Started (Local)

Requirements: **Node 18+** and **npm**

```bash
# 1) Install deps
npm i

# 2) Run dev server
npm run dev
# open http://localhost:3000

# Optional: test on your phone over Wi-Fi
npm run dev -- -H 0.0.0.0 -p 3003
# visit http://<your-laptop-ip>:3003 on your phone
