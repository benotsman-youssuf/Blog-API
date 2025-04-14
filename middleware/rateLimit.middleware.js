import Redis from "ioredis";
const redis = new Redis();

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;
    const key = `rate-limit:${ip}`;

    const limit = 5; 
    const windowTime = 15 * 60; 

    const requests = await redis.incr(key);
    if (requests === 1) {
      await redis.expire(key, windowTime);
    }

    if (requests > limit) {
      return res.status(429).json({ message: "too many requests try again" });
    }
    next();
  } catch (error) {
    console.error("Error in rateLimiter middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export default rateLimiter;
