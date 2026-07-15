import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import PublicLayout from '../layouts/PublicLayout';
import PageLoader from '../components/PageLoader';
import ProtectedRoute from './ProtectedRoute';

const LandingPage = lazy(() => import('../pages/LandingPage'));
const AuthPage = lazy(() => import('../pages/AuthPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const NewDesignPage = lazy(() => import('../pages/NewDesignPage'));
const DesignsPage = lazy(() => import('../pages/DesignsPage'));
const DesignDetailPage = lazy(() => import('../pages/DesignDetailPage'));
const TemplatesPage = lazy(() => import('../pages/TemplatesPage'));
const ComparePage = lazy(() => import('../pages/ComparePage'));
const LearningPage = lazy(() => import('../pages/LearningPage'));
const TopicPage = lazy(() => import('../pages/TopicPage'));
const QuizPage = lazy(() => import('../pages/QuizPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const SharedDesignPage = lazy(() => import('../pages/SharedDesignPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const router = createBrowserRouter([
  { element: <PublicLayout />, children: [{ path: '/', element: <LandingPage /> }, { path: '/login', element: <AuthPage /> }, { path: '/register', element: <AuthPage /> }] },
  { path: '/shared/:shareId', element: <SharedDesignPage /> },
  { element: <ProtectedRoute />, children: [{ path: '/app', element: <AppLayout />, children: [
    { index: true, element: <DashboardPage /> }, { path: 'new', element: <NewDesignPage /> }, { path: 'designs', element: <DesignsPage /> },
    { path: 'designs/:designId', element: <DesignDetailPage /> }, { path: 'templates', element: <TemplatesPage /> }, { path: 'compare', element: <ComparePage /> },
    { path: 'learn', element: <LearningPage /> }, { path: 'learn/:slug', element: <TopicPage /> }, { path: 'quiz', element: <QuizPage /> },
    { path: 'profile', element: <ProfilePage /> }, { path: 'settings', element: <SettingsPage /> },
  ] }] },
  { path: '*', element: <NotFoundPage /> },
]);

export default function AppRouter() { return <Suspense fallback={<PageLoader />}><RouterProvider router={router} /></Suspense>; }
