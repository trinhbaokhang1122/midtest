import userModel from "../models/user.model.js";

export const verifyApiKey = async (req, res, next) => {
  const apiKey = req.query.apiKey;
  if (!apiKey) return res.status(401).json({ error: 'Missing apiKey' });

  const user = await userModel.findOne({ apiKey });
  if (!user) return res.status(403).json({ error: 'Invalid or expired apiKey' });

  req.user = user;
  next();
};
