import { useRouter } from 'next/navigation';
// import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';
import { toast } from 'react-toastify';
import { addUserMessage, setUserInput } from '@/redux/slices/chat/chatSlice';

export const useSendMessage = () => {
  const { isLoading, isSuccess, isError, error } = useSelector(
    (store: StoreTypes) => store.chat
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const mutate = async (userInput: string) => {
    if (!navigator.onLine) {
      toast.warning('Please check your internet connection.');
      return;
    }

    dispatch(setUserInput(''));
    dispatch(addUserMessage(userInput));

    // @ts-ignore
    dispatch(sendMessage([...messages, { role: 'user', content: userInput }]));
  };

  return { mutate };
};
