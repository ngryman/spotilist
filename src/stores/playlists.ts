import type { Playlist } from "../types";
import {
  get,
  derived,
  Readable,
  readable,
  Subscriber,
  writable,
} from "svelte/store";
import { fetchPlaylists } from "../api";

export const playlists = readable<Playlist[]>([], (set) => {
  loadPlaylists(set);
});

export const selectedPlaylists = writable<Playlist[]>([]);

export const inboxPlaylist = derived<Readable<Playlist[]>, Playlist>(
  playlists,
  (playlists, set) => {
    const inbox = playlists.find((p) => p.name === "INBOX");
    if (inbox) {
      set(inbox);
    }
  }
);

async function loadPlaylists(set: Subscriber<Playlist[]>): Promise<void> {
  const playlists = await fetchPlaylists();
  set(playlists);
}

export function togglePlaylist(playlist: Playlist) {
  const selected = get(selectedPlaylists).find((p) => p.id === playlist.id);
  if (!selected) {
    selectedPlaylists.update((playlists) => [...playlists, playlist]);
  } else {
    selectedPlaylists.update((playlists) =>
      playlists.filter((p) => p.id !== playlist.id)
    );
  }
}
