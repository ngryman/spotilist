<script lang="ts">
  import Sidebar from "./components/Sidebar.svelte";
  import PlaylistItem from "./components/PlaylistItem.svelte";
  import { playlists } from "./stores/playlists";
  import ApplyButton from "./components/ApplyButton.svelte";

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
    <ApplyButton />
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
    grid-template-columns: 300px 1fr;
    grid-template-rows: 100% 100%;
    height: 100vh;
    background: #000;
  }

  article {
    overflow-y: scroll;
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    background: #191414;
  }

  ul {
    --padding: 20px;

    display: grid;
    justify-content: center;
    padding: var(--padding) var(--padding) 200px var(--padding);
    gap: var(--padding);
    grid-template-columns: repeat(auto-fit, 120px);
    grid-template-rows: repeat(auto-fit, minmax(min-content, 140px));
  }
</style>
