/** @format */

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader = () => {
  return <div>Chat Header</div>;
};

export default ChatHeader;
