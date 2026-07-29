import ratelimit from "../config/upstash.js";

export default async function (req, res, next) {
  try {
    const { success } = await ratelimit.limit();

    if (!success) {
      return res.status(429).json({ message: "Too many requests" });
    }
    next();
  } catch (error) {
    console.error("Error in rate limiter", error);
    next(error);
  }
}
