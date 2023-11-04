'use client';

import { FC, FormEvent, useEffect } from 'react';
import styles from './page.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '@/redux/slices/auth/authService';
import { StoreTypes } from '@/redux/store';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/ui/textInput/TextInput';
import { setOtpInput } from '@/redux/slices/formInputSlice';
import Button from '@/components/ui/button/Button';
import { useVerifyOtp } from '@/lib/hooks/useVerifyOtp';
import FullScreenLoader from '@/components/ui/fullScreenLoader/FullScreenLoader';
import { toast } from 'react-toastify';
import { useResendOtp } from '@/lib/hooks/useResendOtp';
import { useLogout } from '@/lib/hooks/useLogout';

interface Props {}

const EmailVerificationPage: FC<Props> = () => {
  const {
    isAuthenticating,
    isAuthError,
    authError,
    user,
    isVerifying,
    isResendingOtp,
  } = useSelector((store: StoreTypes) => store.auth);
  const { otpInput } = useSelector((store: StoreTypes) => store.formInputs);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // @ts-ignore
    !user && dispatch(getCurrentUser());
  }, []);

  useEffect(() => {
    if (isAuthError) {
      router.replace('/login');
      toast.error(authError);
    }
    if (user && user?.verified) {
      router.replace('/dashboard');
    }
  }, [isAuthError, authError, user]);

  const { mutate: resendOtp } = useResendOtp();
  const { mutate: verifyOtp } = useVerifyOtp();
  const { mutate: logout } = useLogout();

  const handleOtpVerification = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    verifyOtp({
      otp: otpInput,
      email: user?.email,
    });
  };

  if (isAuthenticating || !user) {
    return <FullScreenLoader />;
  }

  return (
    <section className={styles.page_container}>
      <div className={styles.form_container}>
        <div className={styles.form_header}>
          <h2>Verify your Email.</h2>
          <p>
            We sent a One-Time Password to your registered email: {user?.email}.
            Please enter the code below.
          </p>
        </div>

        <form onSubmit={(e) => handleOtpVerification(e)}>
          <TextInput
            placeholder="Enter OTP"
            value={otpInput}
            setValue={setOtpInput}
          />

          <Button
            tagType="button"
            width="100%"
            disabled={otpInput.length < 6 || isVerifying}
          >
            {isVerifying ? 'Verifying...' : 'Verify'}
          </Button>

          <Button
            tagType="a"
            onClick={() => logout()}
            // href="/login"
            width="100%"
            background="transparent"
            border="1px solid #1b1b1b"
            color="#171717"
          >
            Return to Login
          </Button>
        </form>

        <p>
          Didn't receive OTP?{' '}
          <span
            onClick={async () => await resendOtp(user?.email)}
            style={isResendingOtp ? { opacity: 0.7 } : undefined}
          >
            {isResendingOtp ? 'Resending OTP...' : 'Resend'}
          </span>
        </p>
      </div>
    </section>
  );
};

export default EmailVerificationPage;
