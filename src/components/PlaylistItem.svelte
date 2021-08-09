<script lang="ts">
  import type { Playlist } from "../types";

  export let playlist: Playlist;
  export let selected: boolean = false;

  function handleClick() {
    selected = !selected;
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
    <path
      d="M16,0C7.163,0,0,7.163,0,16c0,8.837,7.163,16,16,16c8.836,0,16-7.164,16-16C32,7.163,24.836,0,16,0z M16,30 C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2s14,6.268,14,14C30,23.732,23.732,30,16,30z"
      fill="#ccc"
    />
    <path
      d="M23.3,10.393L13.012,20.589l-4.281-4.196c-0.394-0.391-1.034-0.391-1.428,0 c-0.395,0.391-0.395,1.024,0,1.414l4.999,4.899c0.41,0.361,1.023,0.401,1.428,0l10.999-10.899c0.394-0.39,0.394-1.024,0-1.414 C24.334,10.003,23.695,10.003,23.3,10.393z"
      fill="#ccc"
    />
  </svg>
</playlist-item>

<style>
  playlist-item {
    position: relative;
    box-shadow: #111 4px 4px 4px;
    border: 2px solid transparent;
    border-radius: 4px;
    padding: 10px;
    background: #242424;
    cursor: pointer;
    transition: opacity 300ms;
    will-change: transform;
  }

  playlist-item.selected {
    box-shadow: none;
    border: 2px solid #ccc;
    animation: push 100ms ease-out;
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
    /* opacity: 0.6; */
    opacity: 0.8;
  }

  svg {
    position: absolute;
    /* top: 50%;
    left: 50%; */
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    /* transform: translate(-50%, -50px) scale(0.95); */
    opacity: 0;
    transition: all 200ms;
  }

  playlist-item.selected svg {
    /* transform: translate(-50%, -50px) scale(1); */
    opacity: 1;
  }

  @keyframes push {
    50% {
      transform: scale(0.98);
    }
  }
</style>
