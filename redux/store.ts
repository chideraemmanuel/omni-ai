import { configureStore } from '@reduxjs/toolkit';
import formInputReducer, { FormInputStateTypes } from './slices/formInputSlice';
import navigationReducer, {
  NavigationStateTypes,
} from './slices/navigationSlice';
import chatReducer, { ChatStateTypes } from './slices/chat/ChatSlice';

export interface StoreTypes {
  formInputs: FormInputStateTypes;
  navigation: NavigationStateTypes;
  chat: ChatStateTypes;
}

const store = configureStore({
  reducer: {
    formInputs: formInputReducer,
    navigation: navigationReducer,
    chat: chatReducer,
  },
});

export default store;
