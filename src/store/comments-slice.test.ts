import { describe, it, expect } from 'vitest';
import { commentsReducer, clearComments, fetchComments, postComment } from './comments-slice';

const mockReview = (overrides = {}) => ({
  id: '1',
  comment: 'test',
  date: '2023-01-01',
  rating: 5,
  offerId: 'offer-1',
  user: { name: 'user', avatarUrl: '', isPro: false },
  ...overrides
});

const initialState = {
  comments: [],
  isSending: false,
};

describe('comments-slice', () => {
  it('should return initial state with unknown action', () => {
    expect(commentsReducer(initialState, { type: '' })).toEqual(initialState);
  });
  it('should clear comments', () => {
    const state = { ...initialState, comments: [mockReview()] };
    expect(commentsReducer(state, clearComments()).comments).toEqual([]);
  });
  it('should set comments on fetchComments.fulfilled', () => {
    const reviews = [mockReview({ id: '2' })];
    const state = commentsReducer(initialState, { type: fetchComments.fulfilled.type, payload: reviews });
    expect(state.comments).toEqual(reviews);
  });
  it('should set isSending true on postComment.pending', () => {
    const state = commentsReducer(initialState, { type: postComment.pending.type });
    expect(state.isSending).toBe(true);
  });
  it('should prepend comment and set isSending false on postComment.fulfilled', () => {
    const review = mockReview({ id: '3' });
    const state = { ...initialState, comments: [mockReview({ id: 'old' })] };
    const result = commentsReducer(state, { type: postComment.fulfilled.type, payload: review });
    expect(result.comments[0]).toEqual(review);
    expect(result.isSending).toBe(false);
  });
  it('should set isSending false on postComment.rejected', () => {
    const state = { ...initialState, isSending: true };
    const result = commentsReducer(state, { type: postComment.rejected.type });
    expect(result.isSending).toBe(false);
  });
});
