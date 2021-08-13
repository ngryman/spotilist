<script lang="ts">
  import { inboxTracks } from "@stores/tracks";
  import { CurrentTrack, Track } from "@components/track";
</script>

<ul>
  {#each $inboxTracks as track, i}
    {#if i === 0}
      <li><CurrentTrack {track} /></li>
    {:else}
      <li><Track {track} /></li>
    {/if}
  {/each}
</ul>

<style>
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
