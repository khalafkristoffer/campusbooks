from slowapi import Limiter
from slowapi.util import get_remote_address

# Create a limiter instance that identifies clients by their IP address
limiter = Limiter(key_func=get_remote_address)