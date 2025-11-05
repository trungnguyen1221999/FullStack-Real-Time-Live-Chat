import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from './ui/button'
import { useNavigate } from 'react-router';
import { useState } from 'react';

const Logout = () => {
    const { signOut } = useAuthStore();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    // Tránh double click
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      await signOut();
      navigate("/signin");
    } catch (error) {
        console.error("Logout failed:", error);
    } finally {
        setIsLoggingOut(false);
    }
  }

  return (
    <Button onClick={handleLogout}>
      logout
    </Button>
  )
}

export default Logout
