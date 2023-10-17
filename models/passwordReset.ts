import mongoose, { model, models } from 'mongoose';

const PasswordResetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  resetString: String,
  createdAt: Date,
  expiresAt: Date,
});

const PasswordReset =
  models.PasswordReset || model('PasswordReset', PasswordResetSchema);

export default PasswordReset;
