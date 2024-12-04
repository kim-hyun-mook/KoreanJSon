import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById, Post } from "./hooks/useFetchPosts";
import { DetailStyle } from "./components/ListStyle";
import usePostStore from "./store/zustand";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // zustand 상태에서 selectedPost 가져오기
  const postList = usePostStore((state) => state.postList); // 전체 게시글 목록
  const selectedPost = usePostStore((state) => state.selectedPost);
  const selectedPostIndex = usePostStore((state) => state.selectedPostIndex); // 선택된 게시글 인덱스 가져오기
  const setSelectedPost = usePostStore((state) => state.setSelectedPost);
  const setSelectedPostIndex = usePostStore(
    (state) => state.setSelectedPostIndex
  );

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      try {
        const data = await fetchPostById(id);
        const postData = { ...data, content: data.content || "" }; // content가 undefined일 경우 빈 문자열로 처리
        setPost(postData);
        setSelectedPost(postData); // 상태에 저장

        // 선택된 게시글의 인덱스를 postList에서 찾고 상태에 저장
        const index = postList.findIndex((post) => post.id === parseInt(id));
        setSelectedPostIndex(index); // 해당 인덱스를 zustand 상태에 저장
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id, postList, setSelectedPost, setSelectedPostIndex]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post && !selectedPost) {
    return <div>Post not found</div>;
  }

  // 몇 번째 게시글인지 출력하는 메시지
  const indexMessage =
    selectedPostIndex !== null
      ? ` ${selectedPostIndex + 1}번쨰 리스트 게시글`
      : "error";

  return (
    <DetailStyle>
      <h1>{selectedPost?.title || post?.title}</h1>
      <p>{selectedPost?.content || post?.content}</p>
      <p>Post ID: {id}</p> {/* ID 값 표시 */}
      <p>{indexMessage}</p> {/* 몇 번째 게시글인지 표시 */}
    </DetailStyle>
  );
};

export default PostDetail;
