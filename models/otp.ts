import mongoose, { model, models } from 'mongoose';

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

const OTP = models.OTP || model('OTP', OTPSchema);

export default OTP;
