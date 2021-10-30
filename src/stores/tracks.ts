import type { Playlist, Track } from "../types";
import { derived, get, Writable, writable } from "svelte/store";
import { inboxPlaylist, listedPlaylists } from "./playlists";
import {
  addTrackToPlaylist,
  loadTracksOf,
  removeTrackFromPlaylist,
} from "../api";

export const inboxTracks = writable<Track[]>([], (set) => {
  inboxPlaylist.subscribe(async (inbox) => {
    if (!inbox) return;
    const tracks = await loadTracksOf(inbox);
    set(tracks);
  });
});

export const currentTrackIndex = writable<number>(0);

export const currentTrack = derived<
  [Writable<Track[]>, Writable<number>],
  Track
>(
  [inboxTracks, currentTrackIndex],
  ([tracks, currentTrackIndex]) => tracks[currentTrackIndex]
);

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

export async function nextTrack() {
  if (get(currentTrackIndex) < get(inboxTracks).length - 1) {
    currentTrackIndex.update((index) => index + 1);
  }
}

export async function previousTrack() {
  if (get(currentTrackIndex) > 0) {
    currentTrackIndex.update((index) => index - 1);
  }
}
