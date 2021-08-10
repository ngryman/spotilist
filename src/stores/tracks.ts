import type { Playlist, Track } from "../types";
import { get, writable } from "svelte/store";
import { inboxPlaylist } from "./playlists";
import {
  addTrackToPlaylist,
  loadTracksOf,
  removeTrackFromPlaylist,
} from "../api";

export const currentTrack = writable<Track>();

export const inboxTracks = writable<Track[]>([], (set) => {
  inboxPlaylist.subscribe(async (inbox) => {
    if (!inbox) return;
    const tracks = await loadTracksOf(inbox);
    set(tracks);
  });
});

export async function addTrackToPlaylists(track: Track, playlists: Playlist[]) {
  const inbox = get(inboxPlaylist);
  console.log(inbox);

  await Promise.all([
    ...playlists.map((playlist) => addTrackToPlaylist(track, playlist)),
    removeTrackFromPlaylist(track, inbox),
  ]);
}
