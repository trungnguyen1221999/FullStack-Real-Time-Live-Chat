
import { BrowserRouter, Routes, Route } from 'react-router';
import ChatPage from './pages/ChatPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import { Toaster } from 'sonner';
function App() {
 
  return (
    <>
    <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          {/* protected routes */}
          <Route path="/" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
