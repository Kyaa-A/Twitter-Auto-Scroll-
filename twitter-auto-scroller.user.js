// ==UserScript==
// @name         Twitter Auto Scroller + Refresher with UI
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Auto-scrolls Twitter feed, refreshes every 5 minutes, and shows a floating UI
// @author       Kyaa-A
// @match        https://x.com/*
// @match        https://twitter.com/*
// @updateURL    https://raw.githubusercontent.com/Kyaa-A/Twitter-Auto-Scroll-/main/twitter-auto-scroller.user.js
// @downloadURL  https://raw.githubusercontent.com/Kyaa-A/Twitter-Auto-Scroll-/main/twitter-auto-scroller.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const scrollDelay = 3000;
    const scrollDistance = 500;
    const refreshInterval = 5 * 60 * 1000;

    let autoScrollEnabled = true;
    let scrollCount = 0;
    const startTime = Date.now();

    // Create floating UI
    const ui = document.createElement('div');
    ui.style.position = 'fixed';
    ui.style.top = '20px';
    ui.style.left = '20px';
    ui.style.zIndex = 9999;
    ui.style.background = 'rgba(0,128,0,0.9)';
    ui.style.color = 'white';
    ui.style.padding = '10px';
    ui.style.borderRadius = '10px';
    ui.style.fontFamily = 'monospace';
    ui.style.fontSize = '14px';
    ui.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)';
    ui.style.userSelect = 'none';
    ui.style.cursor = 'pointer';

    function updateUI() {
        const runtime = Math.floor((Date.now() - startTime) / 1000);
        ui.innerHTML = `
            <strong>📜 Auto-scroll:</strong> ${autoScrollEnabled ? 'ON ✅' : 'OFF ❌'}<br>
            <strong>🔃 Scrolls:</strong> ${scrollCount}<br>
            <strong>⏱️ Runtime:</strong> ${runtime}s<br>
            <em>Press 'S' or click to toggle</em>
        `;
    }

    ui.addEventListener('click', () => {
        autoScrollEnabled = !autoScrollEnabled;
        updateUI();
    });

    document.body.appendChild(ui);
    updateUI();

    // Scroll function
    function scrollPage() {
        if (!autoScrollEnabled) return;
        window.scrollBy({ top: scrollDistance, left: 0, behavior: 'smooth' });
        scrollCount++;
        updateUI();
    }

    // Toggle with 'S' key
    window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 's') {
            autoScrollEnabled = !autoScrollEnabled;
            updateUI();
        }
    });

    // Start after initial delay
    setTimeout(() => {
        setInterval(scrollPage, scrollDelay);
        console.log("🚀 Auto-scroll started! Press 'S' to toggle.");
    }, 3000);

    // Auto-refresh
    setTimeout(() => {
        console.log("🔄 Refreshing the page...");
        location.reload();
    }, refreshInterval);

    // Prompt for GitHub star
    if (!localStorage.getItem('twitterAutoScrollStarPrompt')) {
        setTimeout(() => {
            alert("⭐ Enjoying this script? Please consider giving it a star on GitHub!\n\n👉 https://github.com/Kyaa-A/Twitter-Auto-Scroll-");
            localStorage.setItem('twitterAutoScrollStarPrompt', 'true');
        }, 10000);
    }
})();
