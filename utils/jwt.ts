import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
  if(!process.env.JWT_SECRET_SEED){
    throw new Error('No hay semilla JWT - Revisar variables de entorno')
  }
  return jwt.sign(
    //payload
    {_id, email},
    //seed
    process.env.JWT_SECRET_SEED,
    { expiresIn: '30d' }
  )
}
