<script lang="ts">
  import { currentTrack, inboxTracks } from "../stores/tracks";
  import CurrentTrackItem from "./CurrentTrackItem.svelte";

  $: $currentTrack = $inboxTracks[0];
</script>

<sidebar role="navigation">
  <ul>
    {#each $inboxTracks as track, i}
      {#if i === 0}
        <CurrentTrackItem {track} />
      {:else}
        <li>{track.name}</li>
      {/if}
    {/each}
  </ul>
</sidebar>

<style>
  sidebar {
    width: 200px;
    background: #111;
  }

  ul {
    padding: 10px;
    list-style: none;
  }

  li {
    line-height: 1.5rem;
  }
</style>
