import { Request, Response } from 'express'

export const error500 = (_req: Request, res: Response) => {
  return res.status(500).json({ message: 'Route not found' })
}
