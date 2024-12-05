import React from "react";
import { useParams } from "react-router-dom";
import { useFetchPostById } from "./hooks/useFetchPosts";
import { DetailStyle } from "./components/ListStyle";
import usePostStore from "./store/zustand";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Zustand 상태
  const postList = usePostStore((state) => state.postList); // 전체 게시글 목록
  const setSelectedPost = usePostStore((state) => state.setSelectedPost);
  const setSelectedPostIndex = usePostStore(
    (state) => state.setSelectedPostIndex
  );

  // React Query를 사용해 데이터 fetching
  const { data: post, isLoading, error } = useFetchPostById(id || "");

  // Zustand 상태 업데이트
  React.useEffect(() => {
    if (post && id) {
      setSelectedPost({
        ...post,
        content: post.content || "", // content가 undefined일 경우 빈 문자열로 처리
      });

      // 선택된 게시글의 인덱스를 postList에서 찾아 저장
      const index = postList.findIndex((item) => item.id === parseInt(id));
      setSelectedPostIndex(index >= 0 ? index : null);
    }
  }, [post, id, postList, setSelectedPost, setSelectedPostIndex]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  // 몇 번째 게시글인지 출력하는 메시지
  const indexMessage =
    postList.findIndex((item) => item.id === post.id) !== -1
      ? ` ${postList.findIndex((item) => item.id === post.id) + 1}번쨰 리스트 게시글`
      : "error";

  return (
    <DetailStyle>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Post ID: {id}</p>
      <p>{indexMessage}</p>
    </DetailStyle>
  );
};

export default PostDetail;
