import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './routes/AppRouter';

export default function App() {
  return <AuthProvider><AppRouter /><Toaster position="top-right" toastOptions={{ style: { background: '#111827', color: '#f8fafc', border: '1px solid rgba(255,255,255,.1)' } }} /></AuthProvider>;
}
