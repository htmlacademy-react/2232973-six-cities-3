import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Review, ReviewAuth } from '@/types/reviews';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '@/const';

type CommentsState = {
  comments: Review[];
  isSending: boolean;
};

const initialState: CommentsState = {
  comments: [],
  isSending: false,
};

export const fetchComments = createAsyncThunk<Review[], string, { extra: AxiosInstance }>(
  'comments/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${ApiRoute.Comments}/${offerId}`);
    return data;
  }
);

export const postComment = createAsyncThunk<Review, ReviewAuth, { extra: AxiosInstance}>(
  'comments/postComment',
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<Review>(`${ApiRoute.Comments}/${offerId}`, { comment, rating});
    return data;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(postComment.pending, (state) => {
        state.isSending = true;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments = [action.payload, ...state.comments];
        state.isSending = false;
      })
      .addCase(postComment.rejected, (state) => {
        state.isSending = false;
      });
  }
});

export const commentsReducer = commentsSlice.reducer;
export const { clearComments } = commentsSlice.actions;

