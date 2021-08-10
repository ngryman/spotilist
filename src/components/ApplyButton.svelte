<script lang="ts">
  import {
    addTrackToPlaylists,
    currentTrack,
    inboxTracks,
  } from "../stores/tracks";
  import { selectedPlaylists } from "../stores/playlists";

  $: disabled = $selectedPlaylists.length === 0;

  function handleClick() {
    addTrackToPlaylists($currentTrack, $selectedPlaylists);
    $inboxTracks = $inboxTracks.slice(1);
    $selectedPlaylists = [];
  }
</script>

<button {disabled} on:click={handleClick}>
  <svg xmlns="http://www.w3.org/2000/svg">
    <use href="#icon-check" fill={disabled ? "#555" : "#1db954"} />
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
    transition: transform 200ms;
  }

  button:disabled {
    background: #191414;
  }

  button svg {
    width: 100%;
    height: 100%;
  }

  button:hover:not(:disabled) svg {
    transform: scale(1.1);
  }

  button:active:not(:disabled) svg {
    transform: scale(0.95);
  }
</style>
