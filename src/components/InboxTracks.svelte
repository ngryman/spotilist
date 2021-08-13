<script lang="ts">
  import { inboxTracks } from "../stores/tracks";
  import { CurrentTrack } from "./CurrentTrack";
  import Track from "./Track.svelte";
</script>

<sidebar role="navigation">
  <ul>
    {#each $inboxTracks as track, i}
      {#if i === 0}
        <li><CurrentTrack {track} /></li>
      {:else}
        <li><Track {track} /></li>
      {/if}
    {/each}
  </ul>
</sidebar>

<style>
  sidebar {
    overflow-y: scroll;
    background: #111;
  }

  ul {
    padding: 20px;
    list-style: none;
  }

  li {
    overflow: hidden;
    line-height: 1.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
