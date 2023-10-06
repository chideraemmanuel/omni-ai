import { configureStore } from '@reduxjs/toolkit';
import formInputReducer, { FormInputStateTypes } from './slices/formInputSlice';
import navigationReducer, {
  NavigationStateTypes,
} from './slices/navigationSlice';
import chatReducer, { ChatStateTypes } from './slices/chat/chatSlice';
import imageGenerationReducer, {
  ImageGenerationTypes,
} from './slices/image-generation/imageGenerationSlice';

export interface StoreTypes {
  formInputs: FormInputStateTypes;
  navigation: NavigationStateTypes;
  chat: ChatStateTypes;
  imageGeneration: ImageGenerationTypes;
}

const store = configureStore({
  reducer: {
    formInputs: formInputReducer,
    navigation: navigationReducer,
    chat: chatReducer,
    imageGeneration: imageGenerationReducer,
  },
});

export default store;
