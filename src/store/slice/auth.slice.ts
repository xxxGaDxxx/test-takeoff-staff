import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthArgs, UserType } from '@/api/type.ts';
import authApi from '@/api/authApi.ts';
import { AppThunk } from '@/store/store.ts';
import axios from 'axios';
import { toast } from 'react-toastify';

interface InitialState {
  isLogin: boolean;
  isRegister: boolean;
  loading: boolean;
  user: UserType | null;
}

const initialState: InitialState = {
  isLogin: false,
  isRegister: false,
  loading: false,
  user: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthorized(state, action: PayloadAction<{ isLogin: boolean }>) {
      state.isLogin = action.payload.isLogin;
    },
    setLoading(state, action: PayloadAction<{ loading: boolean }>) {
      state.loading = action.payload.loading;
    },
    setDataUser(state, action: PayloadAction<{ data: UserType | null }>) {
      state.user = action.payload.data;
    },
    setRegister(state, action: PayloadAction<{ isRegister: boolean }>) {
      state.isRegister = action.payload.isRegister;
    },
  },
});

export const authReducer = slice.reducer;
export const { setIsAuthorized, setLoading, setDataUser, setRegister } = slice.actions;

export const login =
  (params: AuthArgs): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading({ loading: true }));
    try {
      const { data } = await authApi.login(params);
      dispatch(setIsAuthorized({ isLogin: true }));
      dispatch(setDataUser({ data: data.user }));

      sessionStorage.setItem('accessToken', data.accessToken);
      sessionStorage.setItem('userId', String(data.user.id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(setIsAuthorized({ isLogin: false }));
        toast.error(err?.response?.data);
      }
    } finally {
      dispatch(setLoading({ loading: false }));
    }
  };

export const register =
  (params: AuthArgs): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading({ loading: true }));
    try {
      await authApi.register(params);
      dispatch(setRegister({ isRegister: true }));
      toast.success("Yay, you're logged in. Now log in.");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data);
      }
    } finally {
      dispatch(setLoading({ loading: false }));
    }
  };

export const me = (): AppThunk => async (dispatch) => {
  dispatch(setLoading({ loading: true }));
  const userId = sessionStorage.getItem('userId');
  const accessToken = sessionStorage.getItem('accessToken');

  if (userId && accessToken) {
    try {
      const { data } = await authApi.me({
        userId,
        accessToken,
      });
      dispatch(setDataUser({ data }));
      dispatch(setIsAuthorized({ isLogin: true }));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data);
      }
    }
  }
  dispatch(setLoading({ loading: false }));
};
