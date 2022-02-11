import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

export const queryKeys = {
  Posts: ['Posts'] as const,
  PostById: (postId: string) => ['Posts', postId] as const,
};

type TData = {
  id: string;
  title: string;
};

const fetcher = async () => {
  const { data } = await axios.get('/api/getPosts');
  return data;
};

const useGetPosts = (options?: UseQueryOptions<TData[], AxiosError>) => {
  return useQuery<TData[], AxiosError>(queryKeys.Posts, fetcher, options);
};

export { useGetPosts };
