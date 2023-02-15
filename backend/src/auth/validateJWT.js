const jwt = require('jsonwebtoken');

const JWT_SECRET='PutYourSecretPassword';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '705min',
};

const validateToken = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try { 
    const validated = jwt.verify(token, JWT_SECRET);
    console.log(validated, 'JWT_____10_ Token Validate');
  } catch (err) {
    if (err) return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

const getIdFromToken = async (token) => {
    const validated = jwt.verify(token, JWT_SECRET, jwtConfig);
    const id = validated.data.userId;
    return id;
};

const createToken = async (id) => {
  const token = jwt.sign({ data: { userId: id } }, JWT_SECRET, jwtConfig);
  return token;
};

module.exports = {
  validateToken,
  getIdFromToken,
  createToken,
};
