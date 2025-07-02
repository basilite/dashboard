import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// pages
import OverviewPage from '../pages/Overview';
import LoginPage from '../pages/Login';
import NotFoundPage from '../pages/NotFound';


export const router = createBrowserRouter([
  { path: '/', element: <OverviewPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '*', element: <NotFoundPage /> },
]);


export default function AppRouter(){
  return <RouterProvider router={router} />;
}