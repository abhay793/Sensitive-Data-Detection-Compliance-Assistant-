import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import Documentation from '../pages/Documentation';
import Help from '../pages/Help';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'documentation',
        element: <Documentation />,
      },
      {
        path: 'help',
        element: <Help />,
      },
    ],
  },
]);
