// ==UserScript==
// @name         Twitter Auto Scroller + Refresher + UI
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Automatically scrolls Twitter feed with a floating status UI and refreshes every 5 minutes
// @author       Kyaa-A
// @match        https://x.com/*
// @match        https://twitter.com/*
// @updateURL    https://raw.githubusercontent.com/Kyaa-A/Twitter-Auto-Scroll-/main/twitter-auto-scroller.user.js
// @downloadURL  https://raw.githubusercontent.com/Kyaa-A/Twitter-Auto-Scroll-/main/twitter-auto-scroller.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Configurations
    const scrollDelay = 3000;
    const scrollDistance = 500;
    const refreshInterval = 5 * 60 * 1000;

    let autoScrollEnabled = true;
    let scrollCount = 0;
    const startTime = Date.now();

    function scrollPage() {
        if (!autoScrollEnabled) return;

        window.scrollBy({
            top: scrollDistance,
            left: 0,
            behavior: 'smooth'
        });

        scrollCount++;
        updateUI();
    }

    window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 's') {
            autoScrollEnabled = !autoScrollEnabled;
            updateUI();
            console.log(`Auto-scroll is now ${autoScrollEnabled ? 'ENABLED' : 'DISABLED'}`);
        }
    });

    setTimeout(() => {
        setInterval(scrollPage, scrollDelay);
        console.log("🚀 Auto-scroll started! Press 'S' to toggle.");
    }, 3000);

    setTimeout(() => {
        console.log("🔄 Refreshing the page...");
        location.reload();
    }, refreshInterval);

    if (!localStorage.getItem('twitterAutoScrollStarPrompt')) {
        setTimeout(() => {
            alert("⭐ Enjoying this script? Please consider giving it a star on GitHub!\n\n👉 https://github.com/Kyaa-A/Twitter-Auto-Scroll-");
            localStorage.setItem('twitterAutoScrollStarPrompt', 'true');
        }, 10000);
    }

    // UI
    let ui;
    function createUI() {
        ui = document.createElement('div');
        ui.className = 'twitter-autoscroll-ui';
        ui.style.position = 'fixed';
        ui.style.top = '20px';
        ui.style.right = '20px';
        ui.style.zIndex = '9999';
        ui.style.background = '#1abc9c';
        ui.style.color = '#fff';
        ui.style.padding = '12px 16px';
        ui.style.borderRadius = '12px';
        ui.style.fontFamily = '"Segoe UI", Roboto, sans-serif';
        ui.style.fontSize = '14px';
        ui.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        ui.style.userSelect = 'none';
        ui.style.cursor = 'pointer';
        ui.style.transition = 'transform 0.2s ease';
        ui.style.maxWidth = '250px';
        ui.style.minWidth = '200px';

        const css = document.createElement('style');
        css.innerHTML = `
            .twitter-autoscroll-ui {
                right: 20px !important;
                left: unset !important;
            }
        `;
        document.head.appendChild(css);

        ui.addEventListener('mouseenter', () => {
            ui.style.transform = 'scale(1.03)';
        });
        ui.addEventListener('mouseleave', () => {
            ui.style.transform = 'scale(1)';
        });
        ui.addEventListener('click', () => {
            autoScrollEnabled = !autoScrollEnabled;
            updateUI();
        });

        document.body.appendChild(ui);
        updateUI();
    }

    function updateUI() {
        const runtime = Math.floor((Date.now() - startTime) / 1000);
        ui.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 6px;">🌀 <b>Twitter Scroll @Kyaa-A</b></div>
            <div>✅ <strong>Auto-scroll:</strong> ${autoScrollEnabled ? '<span style="color:#cfff95">ON ✅</span>' : '<span style="color:#ffcccb">OFF ❌</span>'}</div>
            <div>📜 <strong>Scrolls:</strong> ${scrollCount}</div>
            <div>⏱️ <strong>Runtime:</strong> ${runtime}s</div>
            <div style="margin-top: 6px; font-size: 12px; opacity: 0.8;">Press 'S' or click to toggle</div>
        `;
    }

    window.addEventListener('DOMContentLoaded', createUI);
})();
