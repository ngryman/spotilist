<script lang="ts">
  import type { Playlist } from "../types";
  import { selectedPlaylists, togglePlaylist } from "../stores/playlists";
  import playlistImg from "../assets/playlist.svg";

  export let playlist: Playlist;
  $: selected = Boolean($selectedPlaylists.find((p) => p.id === playlist.id));

  function handleClick() {
    togglePlaylist(playlist);
  }
</script>

<playlist-item class={selected && "selected"} on:click={handleClick}>
  <img src={playlist.imageUrl || playlistImg} alt="" />
  <span>{playlist.name} <em>({playlist.total_tracks})</em></span>
  <svg xmlns="http://www.w3.org/2000/svg">
    <use href="#icon-check" fill="#242424" />
  </svg>
</playlist-item>

<style>
  playlist-item {
    position: relative;
    box-shadow: #111 4px 4px 4px;
    border-radius: 6px;
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
