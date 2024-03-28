/** @format */
"use client";

import { Channel, MemberRole, Server, ChannelType } from "@prisma/client";
import { Hash, Mic, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

export default function ServerChannel({
  channel,
  server,
  role,
}: ServerChannelProps) {
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channel.type];
  return (
    <button
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:bg-zinc-700/50 transition mb-1"
      )}>
      <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
    </button>
  );
}
