import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchProductsByFilters,fetchCategories,fetchBrands,createProduct,fetchProductsById, updateProduct } from './ProductAPI';

const initialState = {
  products : [],
  brands : [],
  categories : [],
  status: 'idle',
  totalItems:0,
  selectedProduct : null
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await  fetchAllProducts();
    return response.data;
  }
);

export const fetchProductsByIdAsync = createAsyncThunk(
  'product/fetchProductsById',
  async (id) => {
    const response = await  fetchProductsById(id);
    return response.data;
  }
);

export const fetchAllProductsByFilterAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter,sort,pagination}) => {
    const response = await  fetchProductsByFilters(filter,sort,pagination);
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await  fetchBrands();
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await  fetchCategories();
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'product/create',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct:(state)=>{
      state.selectedProduct=null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchAllProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchProductsByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index= state.products.findIndex(item=>item.id===action.payload.id)
        state.products[index] =action.payload;
      })
  },
});

export const {clearSelectedProduct} = productSlice.actions;


export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands
export const selectCategories = (state) => state.product.categories
export const selectTotalItems = (state) => state.product.totalItems
export const selectProductById = (state) => state.product.selectedProduct

export default productSlice.reducer;
