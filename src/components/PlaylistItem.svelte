<script lang="ts">
  import type { Playlist } from "../types";
  import { selectedPlaylists, togglePlaylist } from "../stores/playlists";

  export let playlist: Playlist;
  $: selected = Boolean($selectedPlaylists.find((p) => p.id === playlist.id));

  function handleClick() {
    togglePlaylist(playlist);
  }
</script>

<playlist-item class={selected && "selected"} on:click={handleClick}>
  <img src={playlist.imageUrl} alt="" />
  <span>{playlist.name} <em>({playlist.total_tracks})</em></span>
  <svg
    version="1.1"
    viewBox="0 0 32 32"
    xml:space="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <!-- <path
      d="M16,0C7.163,0,0,7.163,0,16c0,8.837,7.163,16,16,16c8.836,0,16-7.164,16-16C32,7.163,24.836,0,16,0z M16,30 C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2s14,6.268,14,14C30,23.732,23.732,30,16,30z"
      fill="#242424"
    /> -->
    <path
      d="M23.3,10.393L13.012,20.589l-4.281-4.196c-0.394-0.391-1.034-0.391-1.428,0 c-0.395,0.391-0.395,1.024,0,1.414l4.999,4.899c0.41,0.361,1.023,0.401,1.428,0l10.999-10.899c0.394-0.39,0.394-1.024,0-1.414 C24.334,10.003,23.695,10.003,23.3,10.393z"
      fill="#242424"
    />
  </svg>
</playlist-item>

<style>
  playlist-item {
    position: relative;
    box-shadow: #111 4px 4px 4px;
    border-radius: 4px;
    padding: 10px;
    background: #242424;
    cursor: pointer;
    will-change: transform;
  }

  playlist-item:hover {
    background: #333;
  }

  playlist-item.selected {
    box-shadow: none;
    background: #eee;
    color: #242424;
    animation: push 200ms ease-out;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 2px;
  }

  playlist-item.selected img {
    opacity: 0.3;
  }

  playlist-item.selected span {
    opacity: 0.8;
  }

  svg {
    position: absolute;
    top: 0;
    right: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #eee;
    opacity: 0;
  }

  playlist-item.selected svg {
    opacity: 1;
  }

  @keyframes push {
    20% {
      transform: scale(0.98);
    }
  }
</style>
