# 🌀 Twitter Auto Scroller + Refresher

A Tampermonkey userscript that **automatically scrolls your Twitter (X) timeline** and **refreshes the page every 5 minutes** — perfect for passive browsing or keeping your feed fresh.

---

## 📦 Features

- ✅ Auto-scrolls the timeline every few seconds
- 🔁 Refreshes Twitter/X every 5 minutes
- ⌨️ Press **S** to toggle auto-scrolling on/off
- 💨 Works on both `twitter.com` and `x.com`

---

## 🧠 How It Works

- Scrolls down by a few hundred pixels every 3 seconds
- After 5 minutes, the page refreshes to load new tweets
- You can press the **`S` key** anytime to pause/resume scrolling

---

## 🚀 Installation

> 🧩 Requires [Tampermonkey](https://www.tampermonkey.net/) installed in your browser.

1. Install Tampermonkey if you haven't yet.
2. Click the link below to install the script:

👉 **[Install the script via GitHub](https://raw.githubusercontent.com/Kyaa-A/Twitter-Auto-Scroll-/main/twitter-auto-scroller.user.js)**

3. That's it! Open Twitter and let it scroll for you.

---

## 🛠️ Configuration (Optional)

You can tweak the scroll speed and refresh delay by editing these lines in the script:

```js
const scrollDelay = 3000; // Time between scrolls (in ms)
const scrollDistance = 500; // Pixels per scroll
const refreshInterval = 5 * 60 * 1000; // Time until page refresh (in ms)
