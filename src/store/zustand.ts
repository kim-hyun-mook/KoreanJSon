import create from "zustand";

// Post 타입을 정의
export interface Post {
  id: number;
  title: string;
  content: string;
}

// Zustand 상태의 타입을 정의합니다.
interface PostStore {
  postList: Post[]; // 게시글 목록
  selectedPost: Post | null; // 선택된 게시글
  selectedPostIndex: number | null; // 선택된 게시글의 인덱스
  setPostList: (posts: Post[]) => void; // 게시글 목록 설정
  setSelectedPost: (post: Post | null) => void; // 선택된 게시글 설정
  setSelectedPostIndex: (index: number | null) => void; // 선택된 게시글 인덱스 설정
  deletePost: (id: number) => void; // 게시글 삭제 메서드
}

// Zustand 스토어 생성
const usePostStore = create<PostStore>((set) => ({
  postList: [],
  selectedPost: null,
  selectedPostIndex: null,
  setPostList: (posts) => set({ postList: posts }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setSelectedPostIndex: (index) => set({ selectedPostIndex: index }),
  deletePost: (id) =>
    set((state) => ({
      postList: state.postList.filter((post) => post.id !== id),
    })),
}));

export default usePostStore;
