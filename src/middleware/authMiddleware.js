import jwt from "jsonwebtoken";
import User from "../models/User.js";


// 1. Extract token from Authorization header
// 2. Verify token
// 3. Find user
// 4. Attach user to req.user
// 5. Call next()
// 6. If invalid → return 401

const authMiddleware = async (req, res, next) => {
  try {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const user = await User.findById(decoded.id).select('-password')

      if (!user) {
        return res.status(401).json({ message: 'User not found' })
      }

      req.user = user
      next()
    } else {
      return res.status(401).json({ message: 'Not authorized, no token' })
    }
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' })
  }
};

export default authMiddleware;