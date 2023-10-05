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
    required: [true, 'Please enter a password'],
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