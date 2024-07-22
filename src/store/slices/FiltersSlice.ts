import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import useHttp from "../../utils/useHttp/useHttp";
import { RootState } from "../store";

type Filter = {
  id: string;
};

const filtersAdapter = createEntityAdapter<Filter>({
  selectId: (filter) => filter, // Указываем правильное поле идентификатора
});

const initialState = filtersAdapter.getInitialState({
  filtersLoadingStatus: "idle",
  activeFilter: "all",
});

export const fetchFilters = createAsyncThunk("filters/fetchFilters", () => {
  const { request } = useHttp();
  return request({
    url: "http://localhost:4000/categories",
    method: "GET",
    body: null,
  });
});

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = "loading";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filtersLoadingStatus = "idle";
        filtersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchFilters.rejected, (state, action) => {
        state.filtersLoadingStatus = "error";
        console.error("Error fetching products:", action.payload);
      });
  },
});

const { actions, reducer } = filtersSlice;

export const { selectAll } = filtersAdapter.getSelectors<RootState>(
  (state) => state.filters
);

export default reducer;
export const { activeFilterChanged } = actions;
