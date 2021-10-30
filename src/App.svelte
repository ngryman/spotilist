<script lang="ts">
  import { TrackList } from "@components/track";
  import { PlaylistGrid } from "@components/playlist";
  import ApplyButton from "@components/ApplyButton.svelte";
</script>

<main>
  <nav>
    <TrackList />
  </nav>
  <article>
    <PlaylistGrid />
    <ApplyButton />
  </article>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 14px;
    color: #eee;
  }

  main {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 100% 100%;
    height: 100vh;
    background: #000;
  }

  nav {
    overflow-y: scroll;
    background: #111;
  }

  article {
    overflow-y: scroll;
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    background: #191414;
  }
</style>
