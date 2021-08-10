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

<track-controls>
  <button {disabled} on:click={handleClick}>
    <svg
      version="1.1"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <circle cx="15" cy="15" r="10" fill={disabled ? "transparent" : "#eee"} />
      <path
        d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21.707,12.707l-7.56,7.56  c-0.188,0.188-0.442,0.293-0.707,0.293s-0.52-0.105-0.707-0.293l-3.453-3.453c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0  l2.746,2.746l6.853-6.853c0.391-0.391,1.023-0.391,1.414,0S22.098,12.316,21.707,12.707z"
        fill={disabled ? "#555" : "#1db954"}
      />
    </svg>
  </button>
</track-controls>

<style>
  track-controls {
    display: flex;
    justify-content: center;
  }

  button {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    will-change: transform;
    transition: transform 200ms;
  }

  button:hover:not(:disabled) svg {
    transform: scale(1.05);
  }

  button:active:not(:disabled) svg {
    transform: scale(0.95);
  }
</style>
