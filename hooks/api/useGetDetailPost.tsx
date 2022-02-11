import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { queryKeys } from './useGetPosts';

type TData = {
  id: number;
  title: string;
};

const fetcher = async (id: string) => {
  const { data } = await axios.get(`/api/getDetailPost/${id}`);
  return data;
};

const useGetDetailPost = (
  id: string,
  options?: UseQueryOptions<TData, AxiosError>,
) => {
  return useQuery<TData, AxiosError>(
    queryKeys.PostById(id),
    () => fetcher(id),
    options,
  );
};

export { useGetDetailPost };
