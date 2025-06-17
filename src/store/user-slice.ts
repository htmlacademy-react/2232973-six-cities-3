import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiRoute, AuthorizationStatus } from '@/const';
import { User, UserAuth } from '@/types/user';
import { AxiosInstance } from 'axios';
import { dropToken, saveToken } from '@/services/token';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
  error: string | null;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  error: null,
};

const checkUserStatus = createAsyncThunk<User, undefined, { extra: AxiosInstance }>(
  'user/checkUserStatus',
  async(_, { extra: api }) => {
    const { data } = await api.get<User>(ApiRoute.Login);
    return data;
  }
);

const loginUser = createAsyncThunk<User, UserAuth, { extra: AxiosInstance }>(
  'user/loginUser',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<User>(ApiRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  }
);

const logoutUser = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'user/logoutUser',
  async (_, { extra: api }) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserStatus.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkUserStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginUser.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

const userReducer = userSlice.reducer;
const { requireAuthorization } = userSlice.actions;

export {
  userReducer,
  requireAuthorization,
  checkUserStatus,
  loginUser,
  logoutUser,
};
