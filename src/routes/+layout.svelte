<script lang="ts">
  const { children, data } = $props();
</script>

<main>
  <header>
    <h1>Paint collection</h1>
    {#if data.session}
      <a href="/logout">Logout</a>
    {/if}
  </header>

  <section class="container">
    {@render children()}
  </section>

  <footer>
    
  </footer>
</main>

<style>
  a {
    color: var(--primaryColor);
    text-decoration: none;
    padding: 10px 20px;
    background-color: var(--btnPrimaryColor);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: inline-block;
    text-align: center;
  }

  a:hover {
    background-color: var(--btnPrimaryColorHover);
  }
</style>