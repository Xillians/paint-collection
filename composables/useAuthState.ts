type AuthState = {
  isLoggedIn: boolean
}
export const useAuthState = () => useState<AuthState>('auth', () => {
  const cookie = useCookie('clientSession');
  console.log('cookie', cookie);
  if (cookie.value) {
    return { isLoggedIn: true };
  }
  return { isLoggedIn: false };
});