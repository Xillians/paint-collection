import { ref } from 'vue'

export function useAuthState() {
  const session = useCookie('clientSession');
  const isLoggedIn = ref(false);

  if (session.value) {
    isLoggedIn.value = true;
  }

  return { isLoggedIn }
}