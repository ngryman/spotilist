<script lang="ts">
  import type { Readable } from "svelte/store";
  import { derived } from "svelte/store";

  import type { Playlist, Track } from "../types";
  import { playlists } from "../stores/playlists";
  import CurrentTrackItem from "./CurrentTrackItem.svelte";

  async function loadTracks(pls: Playlist[], set: (value: Track[]) => void) {
    const inboxPlaylist = pls.find((p) => p.name === "INBOX");
    if (!inboxPlaylist) return;

    const fields = "items(track(id,name,href,album(images),artists(name)))";
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${inboxPlaylist.id}/tracks?fields=${fields}`,
      {
        headers: {
          authorization: `Bearer BQAhD0PVm6YWsAzqq_tleWpR_oWr5YFD_EubU9XUejtkYSb_YyqtQkQ6MiijKMikH20XRq8bQAYOsPG4d2zxvYWMOrLHDL3I-lPr5yxpkKUp3JBrTsEJ7E6lYs2mstV9zVyaaQe-gAZ3PjQ-UWpex621`,
        },
      }
    );

    const { items } = await res.json();

    const tracks = items.map(({ track: item }) => ({
      id: item.id,
      name: item.name,
      artist: item.artists[0].name,
      imageUrl: item.album.images
        ? item.album.images[item.album.images.length - 1].url
        : "",
      link: item.href,
    }));

    set(tracks);
  }

  const tracks = derived<Readable<Playlist[]>, Track[]>(
    playlists,
    (playlists, set) => {
      loadTracks(playlists, set);
    },
    []
  );
</script>

<sidebar role="navigation">
  <ul>
    {#each $tracks as track, i}
      {#if i === 0}
        <CurrentTrackItem {track} />
      {:else}
        <li>{track.name}</li>
      {/if}
    {/each}
  </ul>
</sidebar>

<style>
  sidebar {
    width: 200px;
    background: #111;
  }

  ul {
    padding: 10px;
    list-style: none;
  }

  li {
    line-height: 1.5rem;
  }
</style>
