const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior
  event.preventDefault();

  // Save the event object so it can be used later
  window.deferredPrompt = event;

  // Show the install button
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Hide the install button
  butInstall.style.display = 'none';

  // Show the install prompt
  window.deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  const { outcome } = await window.deferredPrompt.userChoice;

  // Clear the deferredPrompt variable
  window.deferredPrompt = null;
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Hide the install button
  butInstall.style.display = 'none';

  // Log the event
  console.log('The app was installed', event);
});