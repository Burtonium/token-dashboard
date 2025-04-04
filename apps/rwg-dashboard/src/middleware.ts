import { env } from '@/env';
import { next } from '@vercel/edge';

export default function middleware(req: Request) {
  if (env.NEXT_PUBLIC_ENVIRONMENT !== 'production') {
    return next();
  }

  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const auth = basicAuth.split(' ')[1];
    if (auth) {
      const decodedAuth = atob(auth).split(':');
      const user = decodedAuth[0];
      const pwd = decodedAuth[1];

      if (user === 'getreal' && pwd === 'getreal2025') {
        return next();
      }
    }
  }

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
