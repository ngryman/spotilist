<script lang="ts">
  import Sidebar from "./components/Sidebar.svelte";
  import PlaylistItem from "./components/PlaylistItem.svelte";
  import { playlists } from "./stores/playlists";

  $: listingPlaylist = $playlists.filter((p) => p.name !== "INBOX");
</script>

<main>
  <Sidebar />
  <article>
    <ul>
      {#each listingPlaylist as playlist}
        <PlaylistItem {playlist} />
      {/each}
    </ul>
  </article>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: #eee;
  }

  main {
    display: grid;
    grid-template-columns: 200px 1fr;
    height: 100vh;
    background: #000;
  }

  article {
    display: grid;
    grid-template-columns: 1fr;
  }

  ul {
    --padding: 20px;

    display: grid;
    justify-content: center;
    padding: var(--padding) var(--padding);
    gap: var(--padding);
    grid-template-columns: repeat(auto-fit, 120px);
    grid-template-rows: repeat(auto-fit, minmax(120px, min-content));
    background: #191414;
  }
</style>
