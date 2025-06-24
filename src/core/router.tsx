import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// pages
import DashboardPage from '../pages/Dashboard';
import LoginPage from '../pages/Login';
import NotFoundPage from '../pages/NotFound';


export const router = createBrowserRouter([
  { path: '/', element: <DashboardPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '*', element: <NotFoundPage /> },
]);


export default function AppRouter(){
  return <RouterProvider router={router} />;
}