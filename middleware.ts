// export { default } from 'next-auth/middleware';
export { auth as middleware } from '@/auth';
export const config = { matcher: ['/account', '/my-journeys', '/my-journeys/new'] };
