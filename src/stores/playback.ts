import type { Device, PlaybackState, Track } from "../types";
import { Subscriber, writable } from "svelte/store";
import { fetchDevices, pause, play, seek } from "../api";

export const devices = writable<Device[]>(undefined, (set) => {
  loadDevices(set);
});

export const playbackState = writable<PlaybackState>({
  isPlaying: false,
  position: 0,
});

async function loadDevices(set: Subscriber<Device[]>): Promise<void> {
  const playlists = await fetchDevices();
  set(playlists);
}

export async function playTrack(track: Track, position: number): Promise<void> {
  devices.subscribe((devices) => {
    if (!devices) return;
    if (devices.length === 0) {
      alert("Please start Spotify on your computer");
    }
    play(devices[0], track, position);
  });
}

export async function pauseTrack(): Promise<void> {
  devices.subscribe((devices) => {
    if (!devices) return;
    if (devices.length === 0) {
      alert("Please start Spotify on your computer");
    }
    pause(devices[0]);
  });
}

export async function seekTrack(position: number): Promise<void> {
  devices.subscribe((devices) => {
    if (!devices) return;
    if (devices.length === 0) {
      alert("Please start Spotify on your computer");
    }
    seek(devices[0], position);
  });
}
