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
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="icon-check" viewBox="3 3 24 24">
      <path
        d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21.707,12.707l-7.56,7.56 c-0.188,0.188-0.442,0.293-0.707,0.293s-0.52-0.105-0.707-0.293l-3.453-3.453c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0 l2.746,2.746l6.853-6.853c0.391-0.391,1.023-0.391,1.414,0S22.098,12.316,21.707,12.707z"
      />
    </symbol>
    <symbol id="icon-play" viewBox="0 0 30 30">
      <polygon points="10,5 25,15 10,25" />
    </symbol>
  </svg>
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
