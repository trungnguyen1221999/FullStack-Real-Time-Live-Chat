import Logout from "@/components/logout"
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

const ChatPage = () => {
  const { user } = useAuthStore();
  const displayName = user?.displayName;
  const handleClick = async () => {
   await api.get("/users/test", {withCredentials:true});
   toast.success("Test API call successful!");
  }
  return (
    <div>
      ChatPage
      {user && <div>Welcome, {displayName}!</div>}
      <Button onClick={handleClick}>test</Button>
      <Logout />
    </div>
  )
}

export default ChatPage
