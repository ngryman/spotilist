<script lang="ts">
  import { inboxTracks, currentTrackIndex, currentTrack } from "@stores/tracks";
  import { CurrentTrack, Track } from "@components/track";
</script>

<ul>
  {#if $currentTrack}
    <li><CurrentTrack track={$currentTrack} /></li>
  {/if}
  {#each $inboxTracks as track, i}
    <li><Track {track} current={i === $currentTrackIndex} /></li>
  {/each}
</ul>

<style>
  ul {
    padding: 20px;
    list-style: none;
  }

  li {
    overflow: hidden;
    line-height: 1.8rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
