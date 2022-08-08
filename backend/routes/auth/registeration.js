import UserService from '../../services/UserService';

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await UserService.findByEmail(email);
  if (user) {
    return res.json({
      success: false,
      message: 'User already exists',
    });
  }
  try {
    const saved = await UserService.create(username, email, password);
    console.log('saved is ', saved);
    return res.json({
      success: true,
      message: 'User created successfully',
    });
  } catch (error) {
    return res.json({
      success: false,
      message: 'Error creating user',
    });
  }
};
