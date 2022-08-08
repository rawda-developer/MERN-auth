import User from '../models/User';

class UserService {
  static async findByEmail(email) {
    return User.findOne({ email });
  }
  static async findByUsername(username) {
    return User.findOne({ username });
  }
  static async create(username, email, password) {
    const user = new User({
      username,
      email,
      password,
    });
    return user.save();
  }
  static async delete(user) {
    return User.findByIdAndDelete(user._id);
  }
  static async changePassword(user, password) {
    return User.findByIdAndUpdate(user._id, { password: password });
  }
}
export default UserService;
