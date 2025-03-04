import { ref } from 'vue'

export function useAuthState() {
  const isLoggedIn = ref(false);

  return { isLoggedIn }
}