<script lang="ts">
  import InboxTracks from "./components/InboxTracks.svelte";
  import PlaylistItem from "./components/PlaylistItem.svelte";
  import { playlists } from "./stores/playlists";
  import ApplyButton from "./components/ApplyButton.svelte";

  $: listingPlaylist = $playlists.filter((p) => p.name !== "INBOX");
</script>

<main>
  <InboxTracks />
  <article>
    <ul>
      {#each listingPlaylist as playlist}
        <PlaylistItem {playlist} />
      {/each}
    </ul>
    <ApplyButton />
  </article>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="icon-check" viewBox="0 0 32 32">
      <path
        d="M23.3,10.393L13.012,20.589l-4.281-4.196c-0.394-0.391-1.034-0.391-1.428,0 c-0.395,0.391-0.395,1.024,0,1.414l4.999,4.899c0.41,0.361,1.023,0.401,1.428,0l10.999-10.899c0.394-0.39,0.394-1.024,0-1.414 C24.334,10.003,23.695,10.003,23.3,10.393z"
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
