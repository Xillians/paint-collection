<script>
  import { onMount } from 'svelte';
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { initializeApp } from "firebase/app";

  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  function loginWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('User logged in: ', user);
      })
      .catch((error) => {
        console.error('Error during login: ', error);
      });
  }

  onMount(() => {
    // Any additional initialization if needed
  });
</script>

<button on:click={loginWithGoogle}>
  Log in with Google
</button>