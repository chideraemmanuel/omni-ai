import { createSlice } from '@reduxjs/toolkit';

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
}

const initialState: ImageGenerationTypes = {
  prompt: '',
  size: null,
  amount: null,
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
  extraReducers: (builder) => {},
});

export const { setPrompt, setSize, setAmount } = imageGenerationSlice.actions;

export default imageGenerationSlice.reducer;
