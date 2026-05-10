export { auth as proxy } from '@/auth';
// Pages protected behind auth wall
export const config = { matcher: ['/account', '/my-journeys', '/my-journeys/new'] };
