import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useDeletePost } from '../../hooks/api/useDeletePost';
import { useGetDetailPost } from '../../hooks/api/useGetDetailPost';

interface Props {}
const DetailAbout: NextPage<Props> = () => {
  const router = useRouter();
  const cache = useQueryClient();
  const { id } = router.query;
  const { data, isLoading, isError } = useGetDetailPost(id as string);

  const { mutate } = useDeletePost({
    onSuccess: (res: any) => {
      cache.setQueryData(['Posts'], (prev: any) => {
        return prev.filter((s: any) => s.id !== parseInt(res.data.id));
      });
      router.replace('/');
    },
    onError: (err) => {
      alert(err.response?.data.msg);
    },
  });

  const onModify = useCallback(() => {
    router.push(`/modify/${id}`);
  }, []);

  const onDelete = useCallback(() => {
    mutate(id as string);
  }, [id]);

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error</div>;
  return (
    <Container>
      <div>id: {data?.id}</div>
      <div>title: {data?.title ? data.title : 'empty title'}</div>
      <div>
        <Btn onClick={onDelete}>delete Button</Btn>
      </div>
      <div>
        <Btn onClick={onModify}>Modify Button</Btn>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Btn = styled.button`
  border-width: 0;
  margin-top: 12px;
  cursor: pointer;
`;

export default DetailAbout;
