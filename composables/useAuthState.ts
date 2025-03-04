import { ref } from 'vue'

export function useAuthState() {
  const session = useCookie('clientSession');
  const isLoggedIn = ref(false);

  if (session.value) {
    isLoggedIn.value = true;
  }

  console.log('isLoggedIn', isLoggedIn.value);

  return { isLoggedIn }
}