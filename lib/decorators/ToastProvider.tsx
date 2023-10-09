'use client';

import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// import 'react-toastify/dist/ReactToastify.min.css'

interface Props {
  children: React.ReactNode;
}

const ToastProvider: FC<Props> = ({ children }) => {
  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  );
};

export default ToastProvider;
