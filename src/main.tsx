// src/main.tsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TestProvider } from './contexts/TestContext';
import { AppProvider } from './contexts/AppContext';
import App from './App';
import './index.css';
import "./new_global.css"

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <TestProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </TestProvider>
    </AuthProvider>
  </BrowserRouter>
);