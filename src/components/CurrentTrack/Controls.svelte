<script lang="ts">
  import { currentTrack } from "../../stores/tracks";
  import { selectedPlaylists } from "../../stores/playlists";
  import { playTrack } from "../../stores/playback";

  function play() {
    playTrack($currentTrack);
  }
</script>

<track-controls>
  <button on:click={play}>
    <svg xmlns="http://www.w3.org/2000/svg">
      <use href="#icon-play" fill="#eee" />
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
