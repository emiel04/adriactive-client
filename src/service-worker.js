self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/assets/img/Logo-inverted.png',
  };
  event.waitUntil(
    self.registration.showNotification('AdriActive', options)
  );
});
