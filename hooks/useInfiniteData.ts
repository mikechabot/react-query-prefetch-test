import {useInfiniteQuery, UseInfiniteQueryOptions} from "@tanstack/react-query";
import {fetchInfiniteData, PaginatedData} from "../service";

export const QUERY_KEY = 'example-data'

export const useInfiniteDataQuery = (
  options?: UseInfiniteQueryOptions<PaginatedData>,
) => {
  const queryFn = ({ pageParam = 0 }) => fetchInfiniteData({pageParam});

  return useInfiniteQuery<PaginatedData>([QUERY_KEY], queryFn, {
    ...options,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
