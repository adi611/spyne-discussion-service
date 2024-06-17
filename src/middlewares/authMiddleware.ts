import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from "express";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const protect = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("err:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};
