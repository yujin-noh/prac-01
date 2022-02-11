import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useWritePost } from '../hooks/api/useWritePost';

interface Props {}
const Post: NextPage<Props> = () => {
  const cache = useQueryClient();
  const router = useRouter();
  const [title, setTitle] = useState('');

  const { mutate, isLoading } = useWritePost({
    onSuccess: (res: any) => {
      cache.setQueryData(['Posts'], (prev: any) => {
        return [...prev, res.data];
      });
      router.replace('/');
    },
    onError: (err) => {
      alert(err.response?.data.msg);
    },
  });
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.stopPropagation();
        mutate({ title });
        setTitle('');
      }
    },
    [title],
  );

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      mutate({ title });
      setTitle('');
    },
    [title],
  );

  return (
    <Container>
      <div>
        <Input
          type='text'
          onKeyPress={onKeyPress}
          onChange={onChange}
          value={title}
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Btn onClick={onClick}>onSubmit</Btn>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1024px;
  margin: 300px auto;
`;

const Input = styled.input`
  margin-right: 30px;
`;
const Btn = styled.button`
  border-width: 0;
  background-color: #eee;
  border-radius: 8px;
  padding: 5px 3px;
  box-sizing: border-box;
  cursor: pointer;
`;

export default Post;
