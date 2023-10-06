import { createSlice } from '@reduxjs/toolkit';
import { generateImage } from './imageGenerationService';

export interface ImageGenerationTypes {
  prompt: string;
  size: {
    title: string | null;
    value: string | null;
  } | null;
  amount: {
    title: string | null;
    value: string | null;
  } | null;

  isGenerating: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: null | string;
  images: any[] | [];
}

const initialState: ImageGenerationTypes = {
  prompt: '',
  size: {
    title: '256 x 256',
    value: '256',
  },
  amount: {
    title: '1 image',
    value: '1',
  },
  isGenerating: false,
  isSuccess: false,
  isError: false,
  error: null,
  images: [],
};

const imageGenerationSlice = createSlice({
  name: 'generate-image',
  initialState,
  reducers: {
    setPrompt: (state: ImageGenerationTypes, action: { payload: string }) => {
      state.prompt = action.payload;
    },
    setSize: (
      state: ImageGenerationTypes,
      action: { payload: { title: string | null; value: string | null } }
    ) => {
      state.size = action.payload;
    },
    setAmount: (
      state: ImageGenerationTypes,
      action: { payload: { title: string | null; value: string | null } }
    ) => {
      state.amount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateImage.pending, (state: ImageGenerationTypes) => {
        state.isGenerating = true;
      })
      .addCase(
        generateImage.fulfilled,
        (state: ImageGenerationTypes, action: { payload: any }) => {
          state.isGenerating = false;
          state.isSuccess = true;
          state.images = action.payload;
        }
      )
      .addCase(
        generateImage.rejected,
        (state: ImageGenerationTypes, action: { payload: any }) => {
          state.isGenerating = false;
          state.isError = true;
          state.error = action.payload;
        }
      );
  },
});

export const { setPrompt, setSize, setAmount } = imageGenerationSlice.actions;

export default imageGenerationSlice.reducer;
