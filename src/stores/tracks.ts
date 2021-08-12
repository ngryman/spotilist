import type { Playlist, Track } from "../types";
import { get, writable } from "svelte/store";
import { inboxPlaylist, listedPlaylists } from "./playlists";
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

export async function addTrackToPlaylists(
  track: Track,
  targetPlaylists: Playlist[]
) {
  listedPlaylists.update((playlists) =>
    playlists.map((playlist) => ({
      ...playlist,
      total_tracks: targetPlaylists.find((p) => p.id === playlist.id)
        ? playlist.total_tracks + 1
        : playlist.total_tracks,
    }))
  );

  const inbox = get(inboxPlaylist);
  await Promise.all([
    ...targetPlaylists.map((playlist) => addTrackToPlaylist(track, playlist)),
    removeTrackFromPlaylist(track, inbox),
  ]);
}
