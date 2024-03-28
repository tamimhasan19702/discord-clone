/** @format */

"use client";
import { ServerWithMemberWithProfiles } from "@/types";
import { MemberRole, ChannelType } from "@prisma/client";
import React from "react";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channel" | "member";
  channelType?: ChannelType;
  server?: ServerWithMemberWithProfiles;
}

export default function ServerSection({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) {
  return <div>ServerSection</div>;
}
