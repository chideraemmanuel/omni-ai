import { configureStore } from '@reduxjs/toolkit';
import formInputReducer, { FormInputStateTypes } from './slices/formInputSlice';
import navigationReducer, {
  NavigationStateTypes,
} from './slices/navigationSlice';

export interface StoreTypes {
  formInputs: FormInputStateTypes;
  navigation: NavigationStateTypes;
}

const store = configureStore({
  reducer: {
    formInputs: formInputReducer,
    navigation: navigationReducer,
  },
});

export default store;
