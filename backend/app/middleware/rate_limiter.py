# filepath: c:\Users\Kristoffer Khalaf\Desktop\newTry\ChalmerShelf\backend\app\middleware\rate_limiter.py
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
import time
from collections import defaultdict
from typing import List # Import List

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(
        self,
        app,
        limit: int = 5,
        window: int = 60,
        # Accept a list of paths instead of a single string
        target_paths: List[str] = ["/auth/register"]
    ):
        super().__init__(app)
        self.limit = limit
        self.window = window
        # Store the list of paths
        self.target_paths = target_paths
        self.requests = defaultdict(list)

    async def dispatch(self, request: Request, call_next):
        # Check if the current request path is in the list of target paths
        if request.url.path in self.target_paths:
            client_ip = request.headers.get("X-Forwarded-For", request.client.host)
            now = time.time()

            valid_requests = [t for t in self.requests[client_ip] if now - t < self.window]
            self.requests[client_ip] = valid_requests

            if len(self.requests[client_ip]) >= self.limit:
                return Response(
                    content="Too many requests. Please try again later.",
                    status_code=429
                )

            self.requests[client_ip].append(now)

        response = await call_next(request)
        return response
