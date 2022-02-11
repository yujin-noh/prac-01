import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';
import { useGetPosts } from '../hooks/api/useGetPosts';

const Home: NextPage = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetPosts({
    onError: (err) => {
      alert(err.response?.data.msg);
    },
  });

  const onPost = useCallback(() => {
    router.push('/post');
  }, []);

  const onClick = useCallback((id) => {
    router.push(`/detail/${id}`);
  }, []);

  if (isLoading) return <div>isLoading...</div>;
  if (isError) return <div>error</div>;

  return (
    <Container>
      <PostingBtn onClick={onPost}>
        <h1>POST</h1>
      </PostingBtn>
      <Wrapper>
        {data?.map((v, idx) => {
          return (
            <Item
              key={idx}
              onClick={() => {
                onClick(v.id);
              }}
            >
              <div>id: {v.id}</div>
              <div>title: {v.title}</div>
            </Item>
          );
        })}
      </Wrapper>
    </Container>
  );
};

const PostingBtn = styled.div`
  cursor: pointer;
  width: 10rem;
  text-align: center;
  box-sizing: border-box;
`;

const Container = styled.div`
  max-width: 1024px;
  margin: 30px auto;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Item = styled.div`
  min-width: 200px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-top: 10px;
  & div {
    margin-right: 30px;
  }
`;

export default Home;
