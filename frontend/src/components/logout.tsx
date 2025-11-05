import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from './ui/button'
import { useNavigate } from 'react-router';

const Logout = () => {
    const { signOut } = useAuthStore();
    const navigate = useNavigate();
  const handleLogout = async () => {
    // Call the logout function from the auth store
    await signOut();
    navigate('/signin');
  }

  return (
    <Button onClick={handleLogout}>
      logout
    </Button>
  )
}

export default Logout
