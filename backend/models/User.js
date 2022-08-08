import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import passportLocalMongoose from 'passport-local-mongoose';
const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      minLength: 6,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: {
        unique: true,
      },
      password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true,
      },
      verified: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: true,
        index: true,
        unique: true,
        default: () => crypto.randomBytes(20).toString('hex'),
      },
    },
  },
  {
    timestamp: true,
  }
);

async function generateHash(password) {
  return bcrypt.hash(password, 12);
}

UserSchema.pre('save', async function save(next) {
  if (this.isModified('password')) {
    this.password = await generateHash(this.password);
  }
  next();
});
UserSchema.methods.comparePassword = async function comparePassword(password) {
  return bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) {
      return false;
    }
    return isMatch;
  });
};
// UserSchema.index({
//   'oauthprofiles.provider': 1,
//   'oauthprofiles.profileId': 1,
// });
// UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', UserSchema);
export default User;
