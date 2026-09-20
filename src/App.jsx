import Toast from './components/ui/Toast.jsx';
import { CareProvider, useCare } from './context/CareContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AppRoutes } from './routes.jsx';

function AppContent() {
  const { toast, clearToast } = useCare();

  return (
    <>
      <AppRoutes />
      <Toast toast={toast} onClose={clearToast} />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CareProvider>
        <AppContent />
      </CareProvider>
    </ThemeProvider>
  );
}


