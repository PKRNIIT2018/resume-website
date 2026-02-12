export class RateLimiter {
    private requests: Map<string, number[]>;
    private windowMs: number;
    private limit: number;

    constructor(windowMs = 60000, limit = 10) {
        this.requests = new Map();
        this.windowMs = windowMs;
        this.limit = limit;
    }

    isRateLimited(ip: string): boolean {
        const now = Date.now();
        const windowStart = now - this.windowMs;

        // Get existing requests for this IP
        let requestTimestamps = this.requests.get(ip) || [];

        // Filter out old requests
        requestTimestamps = requestTimestamps.filter(timestamp => timestamp > windowStart);

        // Check if limit exceeded
        if (requestTimestamps.length >= this.limit) {
            return true;
        }

        // Add current request
        requestTimestamps.push(now);
        this.requests.set(ip, requestTimestamps);

        // Cleanup periodically (optional optimization)
        if (this.requests.size > 1000) {
            this.cleanup(windowStart);
        }

        return false;
    }

    private cleanup(windowStart: number) {
        for (const [ip, timestamps] of this.requests.entries()) {
            const validTimestamps = timestamps.filter(t => t > windowStart);
            if (validTimestamps.length === 0) {
                this.requests.delete(ip);
            } else {
                this.requests.set(ip, validTimestamps);
            }
        }
    }
}

// Global instance for the application
export const apiRateLimiter = new RateLimiter(60000, 10); // 10 requests per minute
