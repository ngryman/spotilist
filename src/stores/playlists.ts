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

export const listedPlaylists = writable<Playlist[]>([], (set) => {
  playlists.subscribe((playlists) => {
    set(playlists.filter((p) => p.name !== "INBOX"));
  });
});

export const checkedPlaylists = writable<Playlist[]>([]);

export const selectedPlaylistIndex = writable(-1);

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
  const selected = get(checkedPlaylists).find((p) => p.id === playlist.id);
  if (!selected) {
    checkedPlaylists.update((playlists) => [...playlists, playlist]);
  } else {
    checkedPlaylists.update((playlists) =>
      playlists.filter((p) => p.id !== playlist.id)
    );
  }
}
