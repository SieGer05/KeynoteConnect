import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import keycloak from './keycloak.js'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

keycloak.init({
  onLoad: 'check-sso',
  pkceMethod: 'S256',
  checkLoginIframe: false
}).then((authenticated) => {
  console.log("Keycloak init success! Authenticated: ", authenticated);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )  
}).catch((error) => {
  console.error("Keycloak init failed", error);
  root.render(
    <div style={{ color: 'red', padding: '20px' }}>
      <h1>Erreur Critique</h1>
      <p>Impossible de contacter le serveur de sécurité (Keycloak).</p>
      <p>Vérifie que Keycloak tourne bien sur le port 8080.</p>
    </div>
  );
})