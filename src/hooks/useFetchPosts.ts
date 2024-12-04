export interface Post {
  id: number;
  title: string;
  content?: string;
}

/*모든 게시글 데이터를 가져오는 함수*/
export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://koreanjson.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

/*특정 ID의 게시글 데이터를 가져오는 함수*/
export const fetchPostById = async (id: string): Promise<Post> => {
  const response = await fetch(`https://koreanjson.com/posts/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post with id ${id}`);
  }
  return response.json();
};
