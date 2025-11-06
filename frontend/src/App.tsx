
import { BrowserRouter, Routes, Route } from 'react-router';
import ChatPage from './pages/ChatPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import { Toaster } from 'sonner';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './components/ThemeProvider';
import { ModeToggle } from './components/ModeToggle';
function App() {
 
  return (
    <>
   <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Toaster richColors />
        <div className='min-h-screen bg-gradient-purple'>
          <div className='absolute top-4 right-4'>
             <ModeToggle />
          </div>
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SignInPage />} />
              {/* protected routes */}
            <Route element={<ProtectedRoute />}>  <Route path="/" element={<ChatPage />} /></Route>
            </Routes>
          </BrowserRouter>
        </div>
   </ThemeProvider>
    </>
  )
}

export default App
