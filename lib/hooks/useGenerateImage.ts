import { useRouter } from 'next/navigation';
// import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';
import { toast } from 'react-toastify';
import { addUserMessage, setUserInput } from '@/redux/slices/chat/chatSlice';
import { generateImage } from '@/redux/slices/image-generation/imageGenerationService';

interface ImageGenerationOptionsTypes {
  prompt: string;
  size: string;
  amount: string;
}

export const useGenerateImage = () => {
  const { isLoading, isSuccess, isError, error } = useSelector(
    (store: StoreTypes) => store.imageGeneration
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const mutate = async (options: ImageGenerationOptionsTypes) => {
    const { amount, prompt, size } = options;

    if (!prompt || prompt === '') {
      // alert('Please enter a prompt');
      toast.warning('Please enter a prompt');
      return;
    } else if (!size) {
      // alert('Please select image(s) size');
      toast.warning('Please select image(s) size');
      return;
    } else if (!amount) {
      //   alert('Please select number of images');
      toast.warning('Please select number of images');
      return;
    }

    if (!navigator.onLine) {
      toast.warning('Please check your internet connection.');
      return;
    }

    dispatch(
      // @ts-ignore
      generateImage({ prompt, size: size?.value, amount: amount?.value })
    );
  };

  return { mutate };
};
