import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, cookies }) => {
  const session = cookies.get('session');
  const path = url.pathname;

  // If the user is not logged in, redirect to the login page
  if (!session && path !== '/login') {
    throw redirect(302, '/login');
  }
  if (session && path === '/login') {
    throw redirect(302, '/');
  }

  // If the user is logged in, return the session
  return {
    session
  };
};