// ==UserScript==
// @name         Twitter Auto Scroller + Refresher
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Automatically scrolls Twitter feed and refreshes every 5 minutes
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
    const scrollDelay = 3000; // milliseconds between scrolls
    const scrollDistance = 500; // pixels per scroll
    const refreshInterval = 5 * 60 * 1000; // 5 minutes in milliseconds

    let autoScrollEnabled = true;

    function scrollPage() {
        if (!autoScrollEnabled) return;

        window.scrollBy({
            top: scrollDistance,
            left: 0,
            behavior: 'smooth'
        });
    }

    // Toggle scroll with 'S' key
    window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 's') {
            autoScrollEnabled = !autoScrollEnabled;
            console.log(`Auto-scroll is now ${autoScrollEnabled ? 'ENABLED' : 'DISABLED'}`);
        }
    });

    // Start scrolling and refresh timers
    setTimeout(() => {
        setInterval(scrollPage, scrollDelay);
        console.log("🚀 Auto-scroll started! Press 'S' to toggle.");
    }, 3000);

    // Auto refresh the page every 5 minutes
    setTimeout(() => {
        console.log("🔄 Refreshing the page...");
        location.reload();
    }, refreshInterval);
})();
