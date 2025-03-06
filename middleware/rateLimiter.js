const rateLimitStorage = new Map();

const rateLimitMiddleware = (req, res, next) => {
    const ip = `${req.ip}_${req.body.username}`; // Get user IP address
    const windowMs = 60 * 1000; // 1 minute window
    const limit = 10; // Max requests per window
    console.log(ip);
    
    const currentTime = Date.now();

    if (!rateLimitStorage.has(ip) ) {
        rateLimitStorage.set(ip, { count: 1, timestamp: currentTime });
    } else {
        const userData = rateLimitStorage.get(ip);
        if (currentTime - userData.timestamp < windowMs) {
            userData.count++;
            if (userData.count > limit) {
                return res.status(429).json({ message: "Too many requests, please try again later." });
            }
        } else {
            rateLimitStorage.set(ip, { count: 1, timestamp: currentTime });
        }
    }
    next();
};
module.exports = rateLimitMiddleware;