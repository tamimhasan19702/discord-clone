/** @format */

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const handleInviteCode = async (
  params: InviteCodePageProps["params"],
  profileId: string
) => {
  if (!params.inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profileId,
        },
      },
    },
  });

  if (existingServer) {
    return `/servers/${existingServer.id}`;
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profileId,
          },
        ],
      },
    },
  });

  if (server) {
    return `/servers/${server.id}`;
  }

  return null;
};

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const redirectUrl = await handleInviteCode(params, profile.id);

  if (redirectUrl) {
    return redirect(redirectUrl);
  }

  return null;
};

export default InviteCodePage;
