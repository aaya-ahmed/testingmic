async function initializeApp() {
  await import('./init-zone')
  await import('./init-localize')
  const { initializeProdMode } = await import('./init-prod-mode');
  const { initializeConsole } = await import('./init-console');
  const { bootstrapAngularApp } = await import('./init-bootstrap');
  initializeProdMode();
  initializeConsole();
  bootstrapAngularApp();
}
initializeApp();