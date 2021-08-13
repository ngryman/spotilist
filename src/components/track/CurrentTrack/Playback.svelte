<script lang="ts">
  import { onMount } from "svelte";
  import { currentTrack } from "@stores/tracks";
  import {
    pauseTrack,
    playbackState,
    playTrack,
    seekTrack,
  } from "@stores/playback";

  let rafId = 0;
  let previousTimestamp = 0;

  $: displayedPosition = Math.floor($playbackState.position / 1000) * 1000;

  onMount(() => {
    return () => {
      cancelAnimationFrame(rafId);
    };
  });

  function tick(timestamp: number) {
    rafId = requestAnimationFrame(tick);

    if (previousTimestamp === 0) {
      previousTimestamp = timestamp;
    }

    $playbackState.position += timestamp - previousTimestamp;
    if ($playbackState.position > $currentTrack.duration_ms) {
      $playbackState.position = 0;
    }

    previousTimestamp = timestamp;
  }

  function playPause() {
    if (!$playbackState.isPlaying) {
      playTrack($currentTrack, $playbackState.position);
    } else {
      pauseTrack();
    }

    $playbackState.isPlaying = !$playbackState.isPlaying;
    rafId = requestAnimationFrame(tick);
  }

  function seek(duration: number) {
    $playbackState.position += duration * 1000;

    if ($playbackState.position < 0) {
      $playbackState.position = 0;
    } else if ($playbackState.position > $currentTrack.duration_ms) {
      $playbackState.position = $currentTrack.duration_ms;
    }

    seekTrack($playbackState.position);
  }

  function handleKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case "s":
        e.stopPropagation();
        playPause();
        break;
      case "a":
        e.stopPropagation();
        seek(-30);
        break;
      case "d":
        e.stopPropagation();
        seek(+30);
        break;
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<track-controls>
  <progress value={displayedPosition} max={$currentTrack.duration_ms} />
  <button class="seek" on:click={() => seek(-30)}>
    <svg xmlns="http://www.w3.org/2000/svg">
      <use href="#icon-fast-backward" fill="#ccc" />
    </svg>
  </button>
  <button class="play" on:click={playPause}>
    <svg xmlns="http://www.w3.org/2000/svg">
      <use
        href={$playbackState.isPlaying ? "#icon-pause" : "#icon-play"}
        fill="#111"
      />
    </svg>
  </button>
  <button class="seek" on:click={() => seek(+30)}>
    <svg xmlns="http://www.w3.org/2000/svg">
      <use href="#icon-fast-forward" fill="#ccc" />
    </svg>
  </button>
</track-controls>

<style>
  track-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  progress {
    overflow: hidden;
    position: relative;
    margin-bottom: 10px;
    border-radius: 2px;
    border: none;
    width: 100%;
    height: 3px;
    background: #999;
  }

  progress::-webkit-progress-value {
    border-radius: 2px;
    background: #eee;
  }

  progress::-moz-progress-bar {
    border-radius: 2px;
    background: #eee;
  }

  button {
    width: 30px;
    height: 30px;
    will-change: transform;
    transition: transform 50ms;
  }

  button svg {
    width: 100%;
    height: 100%;
  }

  button.play {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: #fff;
  }

  button.play svg {
    width: 60%;
    height: 60%;
  }

  button.play:hover:not(:disabled) {
    transform: scale(1.05);
  }

  button.play:active:not(:disabled) {
    transform: scale(1);
  }

  button.seek {
    width: 24px;
    height: 24px;
  }

  button.seek:hover svg use {
    fill: #fff;
  }
</style>
