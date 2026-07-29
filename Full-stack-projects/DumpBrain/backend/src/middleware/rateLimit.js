import ratelimiter from "../config/upstash.js";

export default async function rateLimiter(req, res, next) {
  try {
    const { success } = await ratelimiter.limit();
    if (!success) {
      return res.status(429).json({ message: "Too many requests" });
    }
    next();
  } catch (error) {
    console.error("Error in rateLimit", error);
    next(error);
  }
}
