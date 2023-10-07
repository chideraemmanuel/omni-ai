import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthStateTypes } from './slices/auth/authSlice';
import formInputReducer, { FormInputStateTypes } from './slices/formInputSlice';
import navigationReducer, {
  NavigationStateTypes,
} from './slices/navigationSlice';
import chatReducer, { ChatStateTypes } from './slices/chat/chatSlice';
import imageGenerationReducer, {
  ImageGenerationTypes,
} from './slices/image-generation/imageGenerationSlice';

export interface StoreTypes {
  auth: AuthStateTypes;
  formInputs: FormInputStateTypes;
  navigation: NavigationStateTypes;
  chat: ChatStateTypes;
  imageGeneration: ImageGenerationTypes;
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    formInputs: formInputReducer,
    navigation: navigationReducer,
    chat: chatReducer,
    imageGeneration: imageGenerationReducer,
  },
});

export default store;
