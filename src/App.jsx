import { ThemeProvider } from './context/ThemeContext.jsx';
import { AppRoutes } from './routes.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

