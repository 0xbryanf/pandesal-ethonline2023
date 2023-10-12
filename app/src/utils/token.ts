import jwt from 'jsonwebtoken';

export const signJwt = (object: Object, options?: jwt.SignOptions): string => {
    return jwt.sign(object, process.env.JWT_SECRET as jwt.Secret, { ...(options && options) });
}

export default { signJwt }