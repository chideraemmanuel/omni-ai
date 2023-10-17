import mongoose, { model, models } from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    lowercase: true,
  },
  password: {
    type: String,
    // required: [true, 'Please enter a password'],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  auth_type: {
    // type: 'OMNIAI_AUTH_SERVICE' || 'GOOGLE_AUTH_SERVICE',
    type: String,
    required: true,
  },
});

const User = models.User || model('User', userSchema);

// userSchema.statics.getMessages()
userSchema.statics.updateMessages = function (
  id: string,
  prompt: string,
  response: string
) {
  return this.updateOne(
    { _id: id },
    {
      $push: {
        messages: {
          $each: [
            { role: 'user', content: prompt },
            { role: 'assistant', content: response },
          ],
        },
      },
    }
  );
};

export default User;
