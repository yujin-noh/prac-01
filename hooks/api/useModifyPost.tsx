import axios, { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

type TVariables = {
  id: string;
  title: string;
};

const useModifyPost = (
  options: UseMutationOptions<unknown, AxiosError, TVariables>,
) => {
  return useMutation<unknown, AxiosError, TVariables>((data) => {
    return axios.put(`/api/modifyPost`, data);
  }, options);
};

export { useModifyPost };
