import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {Comment, NewCommentData} from '../../appTypes/comment';
import {db} from '../../db';

export const fetchComments = createAsyncThunk('comments/fetch', async () => {
  const {rows} = db.execute('SELECT * FROM comments');
  const comments = rows?._array.map(row => ({
    id: row.id,
    parentId: row.parent_id,
    content: row.content,
    authorId: row.author_id,
    createdAt: row.created_at,
  }));

  return comments || [];
});

export const addComment = createAsyncThunk(
  'comments/add',
  async ({parentId, content, authorId}: NewCommentData) => {
    const createdAt = new Date().toISOString();
    const {insertId} = db.execute(
      'INSERT INTO comments (parent_id, content, author_id, created_at) VALUES (?, ?, ?, ?)',
      [parentId, content, authorId, createdAt],
    );

    return {
      id: insertId,
      parentId,
      content,
      authorId,
      createdAt,
    } as Comment;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (id: number) => {
    db.execute('DELETE FROM comments WHERE id = ? OR parent_id = ?', [id, id]);
    return id;
  },
);

export interface CommentsState {
  list: Array<Comment>;
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  list: [],
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = false;
      state.list = buildCommentTree(action.payload);
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.list = buildCommentTree([...state.list, action.payload]);
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.list = state.list.filter(
        comment =>
          comment.id !== action.payload && comment.parentId !== action.payload,
      );
    });
  },
});

export const commentsReducer = commentsSlice.reducer;

const buildCommentTree = (comments: Array<Comment>): Array<Comment> => {
  const commentMap = new Map<number, Comment>();
  const rootComments: Array<Comment> = [];

  comments.forEach(comment => {
    commentMap.set(comment.id, {...comment, replies: [], level: 0});
  });

  comments.forEach(comment => {
    if (comment.parentId === null) {
      rootComments.push(commentMap.get(comment.id)!);
    } else {
      const parentComment = commentMap.get(comment.parentId);
      if (parentComment) {
        parentComment.replies?.push(commentMap.get(comment.id)!);
      }
    }
  });

  const flattenTree = (comment: Comment, level: number): Array<Comment> => {
    let flatList = [{...comment, level}];

    comment.replies?.forEach(reply => {
      flatList = flatList.concat(flattenTree(reply, level + 1));
    });

    return flatList;
  };

  let flatComments: Array<Comment> = [];
  rootComments.forEach(comment => {
    flatComments = flatComments.concat(flattenTree(comment, 0));
  });

  return flatComments;
};
