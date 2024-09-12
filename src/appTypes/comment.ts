export interface NewCommentData {
  parentId: number | null;
  authorId: string;
  content: string;
}

export interface Comment extends NewCommentData {
  id: number;
  createdAt: string;
  replies?: Comment[];
  level?: number;
}
