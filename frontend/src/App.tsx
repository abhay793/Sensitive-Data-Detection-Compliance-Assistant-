import { RouterProvider } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AnalysisProvider } from './context/AnalysisContext';
import { router } from './routes';

function App() {
  return (
    <ToastProvider>
      <AnalysisProvider>
        <RouterProvider router={router} />
      </AnalysisProvider>
    </ToastProvider>
  );
}

export default App;
