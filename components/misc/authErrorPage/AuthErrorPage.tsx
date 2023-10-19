'use client';

import React from 'react';

const AuthErrorPage: React.FC = () => {
  return (
    <>
      <span>Auth Error Page!</span>
      <button onClick={() => location.reload()}>refresh</button>
    </>
  );
};

export default AuthErrorPage;
