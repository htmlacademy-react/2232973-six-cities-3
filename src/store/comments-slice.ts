import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Review } from '@/types/reviews';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '@/const';

type CommentsState = {
  comments: Review[];
};

const initialState: CommentsState = {
  comments: [],
};

export const fetchComments = createAsyncThunk<Review[], string, { extra: AxiosInstance }>(
  'comments/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${ApiRoute.Comments}/${offerId}`);
    return data;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});

export const commentsReducer = commentsSlice.reducer;
