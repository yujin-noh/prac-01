import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useModifyPost } from '../../hooks/api/useModifyPost';

interface Props {}
const Modify: NextPage<Props> = () => {
  const router = useRouter();
  const cache = useQueryClient();
  const { id } = router.query;

  const [title, setTitle] = useState('');

  const { mutate } = useModifyPost({
    onSuccess: (res: any) => {
      cache.setQueryData(['Posts', String(res.data.id)], (prev: any) => {
        return { id: prev.id, title: res.data.title };
      });
      router.back();
    },
    onError: (err) => {
      alert(err.response?.data.msg);
    },
  });

  const variables: {
    id: string;
    title: string;
  } = {
    id: id as string,
    title: title,
  };

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.stopPropagation();
        mutate(variables);
        setTitle('');
        return;
      }
    },
    [title],
  );

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      mutate(variables);
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
        <Btn onClick={onClick}>onSubmit</Btn>
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

export default Modify;
