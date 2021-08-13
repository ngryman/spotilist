<script lang="ts">
  import { Playlist } from "@components/playlist";
  import {
    listedPlaylists,
    selectedPlaylistIndex,
    togglePlaylist,
  } from "@stores/playlists";

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

    while (element.nodeName !== "PLAYLIST" && element.parentElement !== null) {
      element = element.parentElement;
    }

    if (element.nodeName !== "PLAYLIST") return;

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

<ul bind:this={playlistsList}>
  {#each $listedPlaylists as playlist, i}
    <Playlist {playlist} selected={i === $selectedPlaylistIndex} />
  {/each}
</ul>

<style>
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
