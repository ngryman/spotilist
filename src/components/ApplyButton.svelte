<script lang="ts">
  import {
    addTrackToPlaylists,
    currentTrack,
    inboxTracks,
  } from "../stores/tracks";
  import { checkedPlaylists, selectedPlaylistIndex } from "../stores/playlists";
  import { playbackState, playTrack } from "../stores/playback";

  $: disabled = $checkedPlaylists.length === 0;

  function apply() {
    addTrackToPlaylists($currentTrack, $checkedPlaylists);
    $inboxTracks = $inboxTracks.slice(1);

    $checkedPlaylists = [];
    $selectedPlaylistIndex = 0;

    $playbackState.position = 0;
    if ($playbackState.isPlaying) {
      playTrack($currentTrack, 0);
    }
  }

  function handleClick() {
    apply();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.stopPropagation();
      apply();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<button {disabled} on:click={handleClick}>
  <svg xmlns="http://www.w3.org/2000/svg">
    <use href="#icon-check" />
  </svg>
</button>

<style>
  button {
    position: sticky;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: #111 0 0 10px 5px;
    background: #eee;
    will-change: transform;
    transition: all 50ms;
  }

  button:disabled {
    opacity: 0;
  }

  button svg {
    width: 100%;
    height: 100%;
  }

  button:hover:not(:disabled) {
    transform: translate(-50%, -50%) scale(1.05);
  }

  button:active:not(:disabled) {
    transform: translate(-50%, -50%) scale(1);
  }
</style>
