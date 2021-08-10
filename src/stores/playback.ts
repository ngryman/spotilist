import type { Device, Track } from "../types";
import { Subscriber, writable } from "svelte/store";
import { fetchDevices, play } from "../api";

export const devices = writable<Device[]>(undefined, (set) => {
  loadDevices(set);
});

async function loadDevices(set: Subscriber<Device[]>): Promise<void> {
  const playlists = await fetchDevices();
  set(playlists);
}

export async function playTrack(track: Track): Promise<void> {
  devices.subscribe((devices) => {
    if (!devices) return;
    if (devices.length === 0) {
      alert("Please start Spotify on your computer");
    }
    play(devices[0], track);
  });
}
