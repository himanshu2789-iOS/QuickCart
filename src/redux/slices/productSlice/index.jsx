

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // Async thunk to fetch products from Store API
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch('https://fakestoreapi.com/products');
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const productSlice = createSlice({
//   name: 'products',
//   initialState: {
//     items: [],
//     status: 'idle', // idle | loading | succeeded | failed
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload || action.error.message;
//       });
//   },
// });

// export default productSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ── NEW: fetch categories from the dedicated endpoint ──
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      return await response.json(); // ["electronics", "jewelery", ...]
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    categories: [],          // raw list from API (no "All")
    categoriesStatus: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // categories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesStatus = 'failed';
      });
  },
});

export default productSlice.reducer;