/** @format */
"use client";

import { Member, Profile } from "@prisma/client";

interface chatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}
const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  socketUrl,
  socketQuery,
}: chatItemProps) => {
  return <div>ChatItem</div>;
};

export default ChatItem;
