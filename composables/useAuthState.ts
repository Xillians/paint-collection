type AuthState = {
  isLoggedIn: boolean
}
export const useAuthState = () => useState<AuthState>('auth', () => {
  const cookie = useCookie('clientSession');
  return {
    isLoggedIn: !!cookie.value
  }
});