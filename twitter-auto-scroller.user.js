// ==UserScript==
// @name         Twitter Auto Scroller + Refresher with Stylish UI
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Auto-scrolls Twitter feed, refreshes every 5 minutes, and shows a stylish floating UI
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
    ui.style.right = '20px'; // Moved to right side
    ui.style.zIndex = 9999;
    ui.style.background = 'linear-gradient(145deg, #00c853, #64dd17)';
    ui.style.color = '#fff';
    ui.style.padding = '12px 16px';
    ui.style.borderRadius = '12px';
    ui.style.fontFamily = '"Segoe UI", Roboto, sans-serif';
    ui.style.fontSize = '14px';
    ui.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    ui.style.userSelect = 'none';
    ui.style.cursor = 'pointer';
    ui.style.transition = 'transform 0.2s ease';

    ui.addEventListener('mouseenter', () => {
        ui.style.transform = 'scale(1.03)';
    });
    ui.addEventListener('mouseleave', () => {
        ui.style.transform = 'scale(1)';
    });

    function updateUI() {
        const runtime = Math.floor((Date.now() - startTime) / 1000);
        ui.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 6px;">🌀 Twitter AutoScroll</div>
            <div>📜 <strong>Status:</strong> ${autoScrollEnabled ? '<span style="color:#cfff95">ON</span>' : '<span style="color:#ffcccb">OFF</span>'}</div>
            <div>🔃 <strong>Scrolls:</strong> ${scrollCount}</div>
            <div>⏱️ <strong>Runtime:</strong> ${runtime}s</div>
            <div style="margin-top: 6px; font-size: 12px; opacity: 0.8;">Press 'S' or click to toggle</div>
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
