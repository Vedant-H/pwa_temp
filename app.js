// Check for Push Notifications support
if ('Notification' in window && 'serviceWorker' in navigator) {
  document.getElementById('notifyButton').addEventListener('click', () => {
    // Request permission for notifications
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // Send a simple notification
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification('Hello from your PWA!', {
            body: 'You just triggered a notification.',
            icon: '/icon-192x192.png',
          });
        });
      } else {
        alert('Notification permission denied!');
      }
    });
  });
}
