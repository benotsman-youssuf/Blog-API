const reqCount = {};

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  if (!reqCount[ip]) {
    reqCount[ip] = { count: 1, lastReq: now };
  } else {
    const timeSinceLastRequest = now - reqCount[ip].lastReq;
    const timeLimit = 15 * 60 * 1000;

    if (timeSinceLastRequest < timeLimit) {
      reqCount[ip].count++;
    } else {
      reqCount[ip] = { count: 1, lastReq: now };
    }
  }
  const maxReq = 2;

  if (reqCount[ip].count > maxReq) {
    return res.status(429).json({ message: "too many requests try again" });
  }
  reqCount[ip].lastReq = now;
  next();
};
export default rateLimiter