import Logout from "@/components/logout"
import { useAuthStore } from "@/stores/useAuthStore";

const ChatPage = () => {
  const { user } = useAuthStore();
  const displayName = user?.displayName;
  return (
    <div>
      ChatPage
      {user && <div>Welcome, {displayName}!</div>}
      <Logout />
    </div>
  )
}

export default ChatPage
