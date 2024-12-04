import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById, Post } from "./hooks/useFetchPosts";
import { DetailStyle } from "./components/ListStyle";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      try {
        const data = await fetchPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <DetailStyle>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </DetailStyle>
  );
};

export default PostDetail;
