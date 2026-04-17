const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: 'Too many requests. Please wait a moment and try again.',
  },
  skip: (req) => {
    // Skip rate limiting for health check
    return req.path === '/health';
  },
});

module.exports = { apiLimiter };
