/** @format */

import { db } from "./db";

const findConversation = async (memberOneId: string, memberTwoId: string) => {
  return await db.conversations.findFirst({
    where: {
      AND: [
        {
          memberOneId: memberOneId,
        },
        {
          memberTwoId: memberTwoId,
        },
      ],
    },
    include: {
      memberOne: {
        include: {
          profile: true,
        },
      },
      memberTwo: {
        include: {
          profile: true,
        },
      },
    },
  });
};

const createNewConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  try {
    return await db.conversations.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
};
