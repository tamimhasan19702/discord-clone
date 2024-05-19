/** @format */

import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/socket-provider";
import { useParams } from "next/navigation";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
}

interface MessagesResponse {
  messages: Message[];
  nextCursor?: string;
}

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();
  const params = useParams();

  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
        },
      },
      { skipNull: true }
    );

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<MessagesResponse, Error>(
      [queryKey, paramKey, paramValue],
      fetchMessages,
      // @ts-ignore
      {
        // @ts-ignore
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchInterval: !isConnected ? 1000 : false,
      }
    );

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
