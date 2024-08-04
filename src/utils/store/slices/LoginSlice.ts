import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import useHttp from '../../useHttp/useHttp';

type LoginState = {
  favLoadingStatus: string;
  favProdLoadingStatus: string;
  userId: string;
  favorites: string[];
};

const initialState: LoginState = {
  favLoadingStatus: 'idle',
  favProdLoadingStatus: 'idle',
  userId: localStorage.getItem('userId') || '',
  favorites: [],
};

export const addToFav = createAsyncThunk<
  void,
  { userId: string; prodId: string },
  { rejectValue: string }
>('login/addToFav', async ({ userId, prodId }) => {
  const { request } = useHttp();
  try {
    const response = await request({
      url: 'http://localhost:3000/users/favorite',
      method: 'POST',
      body: { userId, prodId },
    });
    return response;
  } catch (error) {
    console.error('Add to favorites error:', error);
    throw error;
  }
});

export const removeFromFav = createAsyncThunk<
  void,
  { userId: string; prodId: string },
  { rejectValue: string }
>('login/removeFromFav', async ({ userId, prodId }) => {
  const { request } = useHttp();
  return request({
    url: 'http://localhost:3000/users/favorite',
    method: 'DELETE',
    body: { userId, prodId },
  });
});

export const fetchFav = createAsyncThunk<
  { favorite: string[] },
  string,
  { rejectValue: string }
>('login/fetchFav', async (userId) => {
  const { request } = useHttp();
  return request({
    url: `http://localhost:3000/users/favorite?userId=${encodeURIComponent(
      userId
    )}`,
    method: 'GET',
    body: null,
  });
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logOut: (state) => {
      state.userId = '';
      localStorage.setItem('userId', '');
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem('userId', action.payload);
    },
    addNewFav: (state, action: PayloadAction<string>) => {
      const newFav = action.payload;
      if (!state.favorites.includes(newFav)) {
        state.favorites.push(newFav);
      }
    },
    removeFav: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (item) => item != action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFav.pending, (state) => {
        state.favLoadingStatus = 'loading';
      })
      .addCase(fetchFav.fulfilled, (state, action) => {
        state.favLoadingStatus = 'success';
        state.favorites = [];
        state.favorites.push(...action.payload.favorite);
      })
      .addCase(fetchFav.rejected, (state, action) => {
        state.favLoadingStatus = 'error';
        console.error('Error fetching products:', action.payload);
      });
  },
});

const { actions, reducer } = loginSlice;

export default reducer;
export const { logOut, setUserId, addNewFav, removeFav } = actions;
