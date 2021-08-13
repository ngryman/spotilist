<script lang="ts">
  import InboxTracks from "./components/InboxTracks.svelte";
  import PlaylistItem from "./components/PlaylistItem.svelte";
  import ApplyButton from "./components/ApplyButton.svelte";
  import {
    listedPlaylists,
    selectedPlaylistIndex,
    togglePlaylist,
  } from "./stores/playlists";

  let playlistsList: HTMLUListElement;

  function handleKeydown(e: KeyboardEvent) {
    const style = window.getComputedStyle(playlistsList);
    const stride = style
      .getPropertyValue("grid-template-columns")
      .split(" ").length;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      e.stopPropagation();
      if ($selectedPlaylistIndex === -1) {
        $selectedPlaylistIndex = 0;
      } else if ($selectedPlaylistIndex > 0) {
        $selectedPlaylistIndex--;
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      if ($selectedPlaylistIndex === -1) {
        $selectedPlaylistIndex = 0;
      } else if ($selectedPlaylistIndex < $listedPlaylists.length - 1) {
        $selectedPlaylistIndex++;
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      e.stopPropagation();
      if ($selectedPlaylistIndex === -1) {
        $selectedPlaylistIndex = 0;
      } else if ($selectedPlaylistIndex > stride - 1) {
        $selectedPlaylistIndex -= stride;
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      e.stopPropagation();
      if ($selectedPlaylistIndex === -1) {
        $selectedPlaylistIndex = 0;
      } else if ($selectedPlaylistIndex + stride < $listedPlaylists.length) {
        $selectedPlaylistIndex += stride;
      }
    }

    if (e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      if ($selectedPlaylistIndex === -1) {
        return;
      }
      togglePlaylist($listedPlaylists[$selectedPlaylistIndex]);
    }
  }

  function handleMouseMove(e: MouseEvent) {
    let element = <HTMLElement>e.target;
    while (
      element.nodeName !== "PLAYLIST-ITEM" &&
      element.parentElement !== null
    ) {
      element = element.parentElement;
    }

    if (element.nodeName !== "PLAYLIST-ITEM") return;

    const index = Array.prototype.indexOf.call(
      element.parentElement.children,
      element
    );
    if (index !== $selectedPlaylistIndex) {
      $selectedPlaylistIndex = index;
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} on:mousemove={handleMouseMove} />

<main>
  <InboxTracks />
  <article>
    <ul bind:this={playlistsList}>
      {#each $listedPlaylists as playlist, i}
        <PlaylistItem {playlist} selected={i === $selectedPlaylistIndex} />
      {/each}
    </ul>
    <ApplyButton />
  </article>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="icon-check" viewBox="0 0 32 32">
      <path
        d="M23.3,10.393L13.012,20.589l-4.281-4.196c-0.394-0.391-1.034-0.391-1.428,0 c-0.395,0.391-0.395,1.024,0,1.414l4.999,4.899c0.41,0.361,1.023,0.401,1.428,0l10.999-10.899c0.394-0.39,0.394-1.024,0-1.414 C24.334,10.003,23.695,10.003,23.3,10.393z"
      />
    </symbol>
    <symbol id="icon-play" viewBox="0 0 30 30">
      <polygon points="10,5 25,15 10,25" />
    </symbol>
    <symbol id="icon-pause" viewBox="0 0 35 30">
      <polygon points="10,5 15,5 15,25 10,25" />
      <polygon points="20,5 25,5 25,25 20,25" />
    </symbol>
    <symbol id="icon-fast-forward" viewBox="0 0 35 30">
      <polygon points="10,5 25,15 10,25" />
      <polygon points="20,5 35,15 20,25" />
    </symbol>
    <symbol id="icon-fast-backward" viewBox="0 0 35 30">
      <polygon points="25,5 10,15 25,25" />
      <polygon points="15,5 0,15 15,25" />
    </symbol>
  </svg>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 14px;
    color: #eee;
  }

  main {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 100% 100%;
    height: 100vh;
    background: #000;
  }

  article {
    overflow-y: scroll;
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    background: #191414;
  }

  ul {
    --padding: 20px;

    display: grid;
    justify-content: center;
    padding: var(--padding) var(--padding) 200px var(--padding);
    gap: var(--padding);
    grid-template-columns: repeat(auto-fit, 120px);
    grid-template-rows: repeat(auto-fit, minmax(min-content, 140px));
  }
</style>
