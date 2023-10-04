import { configureStore } from '@reduxjs/toolkit';
import formInputReducer, { FormInputStateTypes } from './slices/formInputSlice';

export interface StoreTypes {
  formInputs: FormInputStateTypes;
}

const store = configureStore({
  reducer: {
    formInputs: formInputReducer,
  },
});

export default store;
