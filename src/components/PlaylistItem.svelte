<script lang="ts">
  import type { Playlist } from "../types";
  import { checkedPlaylists, togglePlaylist } from "../stores/playlists";
  import playlistImg from "../assets/playlist.svg";

  export let playlist: Playlist;
  export let selected = false;

  $: checked = Boolean($checkedPlaylists.find((p) => p.id === playlist.id));

  function handleClick() {
    togglePlaylist(playlist);
  }
</script>

<playlist-item class:checked class:selected on:click={handleClick}>
  <img src={playlist.imageUrl || playlistImg} alt="" />
  <span>{playlist.name} <em>({playlist.total_tracks})</em></span>
  <svg xmlns="http://www.w3.org/2000/svg">
    <use href="#icon-check" fill="#242424" />
  </svg>
</playlist-item>

<style>
  playlist-item {
    position: relative;
    /* box-shadow: #111 4px 4px 4px; */
    border-radius: 6px;
    border: 1px solid transparent;
    padding: 10px;
    background: #242424;
    cursor: pointer;
    transition: opacity 100ms;
    will-change: transform, opacity;
    user-select: none;
  }

  playlist-item.selected {
    background: #333;
    border-color: #666;
  }

  playlist-item.checked {
    box-shadow: none;
    background: #eee;
    color: #242424;
    animation: push 200ms ease-out;
  }

  playlist-item.checked.selected {
    border-color: transparent;
    opacity: 0.8;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 2px;
    pointer-events: none;
  }

  playlist-item.checked img {
    opacity: 0.3;
  }

  playlist-item.checked span {
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

  playlist-item.checked svg {
    opacity: 1;
  }

  @keyframes push {
    20% {
      transform: scale(0.98);
    }
  }
</style>
