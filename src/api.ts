import type { Device, Playlist, Track } from "./types";

import { CLIENT_ID } from "./constants";

let accessToken: string;

export async function fetchPlaylists(): Promise<Playlist[]> {
  const { items } = await fetchApi("me/playlists", {
    search: {
      limit: 50,
    },
  });

  const playlists = items
    .filter((item: any) => item.owner.display_name === "ngryman")
    .map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      imageUrl:
        item.images.length > 0
          ? item.images[Math.min(1, item.images.length - 1)].url
          : "",
      link: item.href,
      total_tracks: item.tracks.total,
    }));

  return playlists;
}

export async function loadTracksOf(playlist: Playlist): Promise<Track[]> {
  const fields =
    "items(track(id,name,href,duration_ms,album(images),artists(name)))";
  const { items } = await fetchApi(`playlists/${playlist.id}/tracks`, {
    search: {
      fields,
    },
  });

  const tracks = items.map(({ track: item }) => ({
    id: item.id,
    name: item.name,
    artist: item.artists[0].name,
    duration_ms: item.duration_ms,
    imageUrl:
      item.album.images.length > 0
        ? item.album.images[Math.min(1, item.album.images.length - 1)].url
        : "",
    link: item.href,
  }));

  return tracks;
}

export async function addTrackToPlaylist(
  track: Track,
  playlist: Playlist
): Promise<void> {
  await fetchApi(
    `playlists/${playlist.id}/tracks?position=0&uris=spotify:track:${track.id}`,
    {
      method: "POST",
    }
  );
}

export async function removeTrackFromPlaylist(
  track: Track,
  playlist: Playlist
): Promise<void> {
  await fetchApi(`playlists/${playlist.id}/tracks`, {
    method: "DELETE",
    body: {
      tracks: [{ uri: `spotify:track:${track.id}` }],
    },
  });
}

export async function fetchDevices(): Promise<Device[]> {
  const { devices } = await fetchApi(`me/player/devices`);
  return devices;
}

export async function play(
  device: Device,
  track: Track,
  position: number
): Promise<void> {
  await fetchApi(`me/player/play?device_id=${device.id}`, {
    method: "PUT",
    body: {
      uris: [`spotify:track:${track.id}`],
      position_ms: position,
    },
  });
}

export async function pause(device: Device): Promise<void> {
  await fetchApi(`me/player/pause?device_id=${device.id}`, {
    method: "PUT",
  });
}

export async function seek(device: Device, position: number): Promise<void> {
  await fetchApi(
    `me/player/seek?device_id=${device.id}&position_ms=${Math.round(position)}`,
    {
      method: "PUT",
    }
  );
}

export async function authorize() {
  // 1. Check we didn't get called back by Spotify with an error...
  const callbackParams = new URLSearchParams(location.search);
  if (callbackParams.has("error")) {
    alert(callbackParams.get("error"));
    return;
  }

  // 2. ... or with an actual token
  const callbackData = new URLSearchParams(location.hash.replace("#", "?"));
  if (callbackData.has("access_token")) {
    const state = callbackData.get("state");
    const storedState = localStorage.getItem("classify:state");
    if (state !== storedState) {
      alert("You're not you!");
      return;
    }

    const token = callbackData.get("access_token");
    accessToken = token;
    localStorage.removeItem("classify:state");

    history.replaceState({}, "", "/");
    return;
  }

  // 3. Start the OAuth implicit grant flow
  const state = Math.random().toString().slice(2);
  localStorage.setItem("classify:state", state);

  const search = {
    client_id: CLIENT_ID,
    response_type: "token",
    redirect_uri: location.origin,
    state,
    scope: encodeURI(
      "playlist-read-private user-read-playback-state user-modify-playback-state"
    ),
  };
  const searchParams = new URLSearchParams(search).toString();

  location.replace(`https://accounts.spotify.com/authorize?${searchParams}`);
}

type FetchApiOptions = {
  method?: string;
  search?: {};
  body?: {};
};

async function fetchApi<T>(
  path: string,
  options: FetchApiOptions = {}
): Promise<T> {
  const { method = "GET", search = {}, body } = options;

  const searchParams = new URLSearchParams(search).toString();

  const res = await fetch(
    `https://api.spotify.com/v1/${path}${
      searchParams ? `?${searchParams}` : ""
    }`,
    {
      method,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    }
  );

  if (res.status !== 204) {
    const data = await res.json();
    return data;
  }

  return undefined;
}
