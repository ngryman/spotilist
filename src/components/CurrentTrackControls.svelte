<script lang="ts">
  import { currentTrack } from "../stores/tracks";
  import { selectedPlaylists } from "../stores/playlists";
  import { playTrack } from "../stores/playback";

  function play() {
    playTrack($currentTrack);
  }
</script>

<track-controls>
  <button on:click={play}>
    <svg
      version="1.1"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <polygon points="10,5 25,15 10,25" fill="#eee" />
    </svg>
  </button>
</track-controls>

<style>
  track-controls {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    width: 30px;
    height: 30px;
    will-change: transform;
    transition: transform 200ms;
  }

  button:hover:not(:disabled) svg {
    transform: scale(1.1);
  }

  button:active:not(:disabled) svg {
    transform: scale(0.95);
  }
</style>
