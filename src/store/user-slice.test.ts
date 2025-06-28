import { describe, it, expect } from 'vitest';
import { userReducer, requireAuthorization, checkUserStatus, loginUser, logoutUser } from './user-slice';
import { AuthorizationStatus } from '@/const';

const mockUser = (overrides = {}) => ({
  name: 'Test User',
  avatarUrl: '',
  isPro: false,
  email: 'test@mail.com',
  token: 'token',
  ...overrides
});

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  error: null,
};

describe('user-slice', () => {
  it('should return initial state with unknown action', () => {
    expect(userReducer(initialState, { type: '' })).toEqual(initialState);
  });
  it('should set authorizationStatus on requireAuthorization', () => {
    const state = userReducer(initialState, requireAuthorization(AuthorizationStatus.Auth));
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });
  it('should set Auth and user on checkUserStatus.fulfilled', () => {
    const user = mockUser();
    const state = userReducer(initialState, { type: checkUserStatus.fulfilled.type, payload: user });
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.user).toEqual(user);
  });
  it('should set NoAuth on checkUserStatus.rejected', () => {
    const state = userReducer(initialState, { type: checkUserStatus.rejected.type });
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });
  it('should set user and Auth on loginUser.fulfilled', () => {
    const user = mockUser();
    const state = userReducer(initialState, { type: loginUser.fulfilled.type, payload: user });
    expect(state.user).toEqual(user);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });
  it('should set NoAuth on loginUser.rejected', () => {
    const state = userReducer(initialState, { type: loginUser.rejected.type });
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });
  it('should clear user and set NoAuth on logoutUser.fulfilled', () => {
    const stateWithUser = { ...initialState, user: mockUser(), authorizationStatus: AuthorizationStatus.Auth };
    const state = userReducer(stateWithUser, { type: logoutUser.fulfilled.type });
    expect(state.user).toBeNull();
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });
});
