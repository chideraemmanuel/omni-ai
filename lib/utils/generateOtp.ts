const generateOtp = () => {
  const length = 6;
  let otp = '';

  for (let i = 1; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  return otp;
};

export default generateOtp;
