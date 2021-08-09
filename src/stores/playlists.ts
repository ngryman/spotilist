import type { Playlist } from "src/types";
import { readable, Subscriber } from "svelte/store";

export const playlists = readable<Playlist[]>([], (set) => {
  loadPlaylists(set);
});

async function loadPlaylists(set: Subscriber<Playlist[]>): Promise<void> {
  const res = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      authorization: `Bearer BQAhD0PVm6YWsAzqq_tleWpR_oWr5YFD_EubU9XUejtkYSb_YyqtQkQ6MiijKMikH20XRq8bQAYOsPG4d2zxvYWMOrLHDL3I-lPr5yxpkKUp3JBrTsEJ7E6lYs2mstV9zVyaaQe-gAZ3PjQ-UWpex621`,
    },
  });

  const { items } = await res.json();

  const playlists = items
    .filter((item: any) => item.owner.display_name === "ngryman")
    .map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      imageUrl: item.images ? item.images[item.images.length - 1].url : "",
      link: item.href,
      total_tracks: item.tracks.total,
    }));

  set(playlists);
}
