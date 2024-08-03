import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import useHttp from '../../useHttp/useHttp';
import { RootState } from '../store';
import { EntityId } from '@reduxjs/toolkit';

type FavoriteItem = {
  _id: string;
  title: string;
  price: string | number;
  description: string;
  previewImage: string;
  bigImage: string;
  category: string;
};

type Login = {
  id: string;
  favLoadingStatus: string;
  favProdLoadingStatus: string;
  isLogged: boolean;
  userId: string;
  favoriteItems: FavoriteItem[];
};

const loginAdapter = createEntityAdapter<FavoriteItem, EntityId>({
  selectId: (prodId) => prodId,
});

const initialState = loginAdapter.getInitialState({
  favLoadingStatus: 'idle',
  favProdLoadingStatus: 'idle',
  isLogged: localStorage.getItem('isLogged') === 'true' || false,
  userId: localStorage.getItem('userId') || '',
  favoriteItems: [],
} as unknown as Login);

export const addToFav = createAsyncThunk(
  'login/addToFav',
  async ({ userId, prodId }: { userId: string; prodId: string }) => {
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
  }
);

export const removeFromFav = createAsyncThunk(
  'login/removeFromFav',
  async ({ userId, prodId }: { userId: string; prodId: string }) => {
    const { request } = useHttp();
    return request({
      url: 'http://localhost:3000/users/favorite',
      method: 'DELETE',
      body: { userId, prodId },
    });
  }
);

export const fetchFav = createAsyncThunk(
  'login/fetchFav',
  async (userId: string) => {
    const { request } = useHttp();
    return request({
      url: `http://localhost:3000/users/favorite?userId=${encodeURIComponent(
        userId
      )}`,
      method: 'GET',
      body: null,
    });
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLogged = true;
      localStorage.setItem('isLogged', 'true');
    },
    logOut: (state) => {
      state.isLogged = false;
      localStorage.setItem('isLogged', 'false');
      localStorage.setItem('userId', '');
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem('userId', action.payload);
    },
    addNewFav: (state, action) => {
      const newFav = action.payload;
      loginAdapter.addOne(state, newFav);
    },
    removeFav: (state, action) => {
      loginAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFav.pending, (state) => {
        state.favLoadingStatus = 'loading';
      })
      .addCase(fetchFav.fulfilled, (state, action) => {
        state.favLoadingStatus = 'success';
        action.payload.favorite.forEach((element: FavoriteItem) => {
          loginAdapter.addOne(state, element);
        });
      })
      .addCase(fetchFav.rejected, (state, action) => {
        state.favLoadingStatus = 'error';
        console.error('Error fetching products:', action.payload);
      });
  },
});

const { actions, reducer } = loginSlice;

export const { selectAll } = loginAdapter.getSelectors((state) => state.login);

export default reducer;
export const { logIn, logOut, setUserId, addNewFav, removeFav } = actions;
