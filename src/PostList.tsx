import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListStyle } from "./components/ListStyle";
import Button from "./components/Button";
import { fetchPosts, Post } from "./hooks/useFetchPosts";
import usePostStore from "./store/zustand";

const PostList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  // zustand 상태에서 postList와 setPostList 가져오기
  const postList = usePostStore((state) => state.postList);
  const setPostList = usePostStore((state) => state.setPostList);
  const deletePost = usePostStore((state) => state.deletePost);

  // PostList.tsx
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        const postsWithContent = data.map((post) => ({
          ...post,
          content: post.content || "", // content가 undefined일 경우 빈 문자열로 처리
        }));
        setPostList(postsWithContent); // 상태에 저장
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [setPostList]);

  const handleDelete = (id: number) => {
    deletePost(id); // zustand 상태에서 게시글 삭제
  };

  if (loading) {
    return <div>Loading...</div>;
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
                  View Details
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
