import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListStyle } from "./components/ListStyle";
import Button from "./components/Button";
import { fetchPosts, Post } from "./hooks/useFetchPosts";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <ListStyle>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <Link to={`/post/${post.id}`}>
              <Button color="primary" variant="solid">
                View Details
              </Button>
            </Link>
          </li>
        ))}
      </ListStyle>
    </div>
  );
};

export default PostList;
