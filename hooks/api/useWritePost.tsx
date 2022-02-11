import axios, { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

type TVariables = {
  title: string;
};
type TData = {
  id: number;
  title: string;
};

const useWritePost = (
  options?: UseMutationOptions<TData, AxiosError, TVariables>,
) => {
  return useMutation<TData, AxiosError, TVariables>(
    (value) => axios.post('/api/writePost', value),
    options,
  );
};

export { useWritePost };
