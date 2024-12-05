import React from "react";
import { Link } from "react-router-dom";
import { ListStyle } from "./components/ListStyle";
import Button from "./components/Button";
import { useFetchPosts } from "./hooks/useFetchPosts";
import usePostStore from "./store/zustand";

const PostList: React.FC = () => {
  // React Query를 통해 게시글 데이터를 가져옴
  const { data: posts, isLoading, error } = useFetchPosts();

  // Zustand 상태에서 postList와 setPostList, deletePost 가져오기
  const postList = usePostStore((state) => state.postList);
  const setPostList = usePostStore((state) => state.setPostList);
  const deletePost = usePostStore((state) => state.deletePost);

  React.useEffect(() => {
    if (posts) {
      const postsWithContent = posts.map((post) => ({
        ...post,
        content: post.content || "", // content가 undefined일 경우 빈 문자열로 처리
      }));
      setPostList(postsWithContent); // Zustand 상태에 저장
    }
  }, [posts, setPostList]);

  const handleDelete = (id: number) => {
    deletePost(id); // Zustand 상태에서 게시글 삭제
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <ListStyle>
        {postList.map((post) => (
          <li key={post.id}>
            <div>
              <h2>{post.title}</h2>
              <Link to={`/post/${post.id}`}>
                <Button color="primary" variant="solid">
                  자세히 보기
                </Button>
              </Link>
              <Button isCloseBtn onClick={() => handleDelete(post.id)} />
            </div>
          </li>
        ))}
      </ListStyle>
    </div>
  );
};

export default PostList;
