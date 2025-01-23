console.log("Hello, Progressive Web App!");

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => {
                console.log("Service Worker registered with scope:", registration.scope);
            })
            .catch((error) => {
                console.log("Service Worker registration failed:", error);
            });
    });
}

// Handle Add to Home Screen (A2HS)
let deferredPrompt;
const downloadButton = document.getElementById("download");

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault(); // Prevent default browser behavior
    deferredPrompt = e; // Save the event for triggering later
    downloadButton.style.display = "block"; // Show the install button

    downloadButton.addEventListener("click", () => {
        deferredPrompt.prompt(); // Trigger the install prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the A2HS prompt.");
            } else {
                console.log("User dismissed the A2HS prompt.");
            }
            deferredPrompt = null;
        });
    });
});
