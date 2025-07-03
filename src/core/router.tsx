import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// pages
import OverviewPage from '../pages/Overview';
import LoginPage from '../pages/Login';
import NotFoundPage from '../pages/NotFound';
import SettingsPage from '../pages/Settings';


export const router = createBrowserRouter([
  { path: '/', element: <OverviewPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '*', element: <NotFoundPage /> },
  { path: '/settings', element: <SettingsPage /> },
]);


export default function AppRouter(){
  return <RouterProvider router={router} />;
}