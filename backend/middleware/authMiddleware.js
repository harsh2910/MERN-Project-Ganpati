import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    
    if(req.headers.auth && req.headers.auth.startsWith('Bearer')) {
        try {
            token = req.headers.auth.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next()
        } catch (error) {
            console.error(error);
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }
    
    if(!token) {
        res.status(401)
        throw new Error('Not authenticated, No token')
    }

} )

export { protect }