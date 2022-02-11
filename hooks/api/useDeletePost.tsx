import axios, { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

const useDeletePost = (
  options?: UseMutationOptions<unknown, AxiosError, string>,
) => {
  return useMutation<unknown, AxiosError, string>((id) => {
    return axios.delete(`/api/deletePost/${id}`);
  }, options);
};

export { useDeletePost };
