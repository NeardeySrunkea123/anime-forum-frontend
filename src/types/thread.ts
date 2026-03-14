export type Thread = {
    id: number;
    forum_id: number;
    user_id: number;
    title: string;
    slug: string;
    content: string;
    views: number;
    is_pinned: boolean;
    anime_uuid: string;
    author_username: string;
    author_avatar?: string;
    anime_title: string;
    forum_name: string;
    post_count: string;
    created_at: string;
  };

  export type Post = {
    id: number;
    thread_id: number;
    user_id: number;
    content: string;
    created_at: string;
    author_username: string;
    like_count: number;
    liked: boolean;
  };