import type { Playlist, Track } from "./types";
import { API_TOKEN } from "./constants";

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
  const fields = "items(track(id,name,href,album(images),artists(name)))";
  const { items } = await fetchApi(`playlists/${playlist.id}/tracks`, {
    search: {
      fields,
    },
  });

  const tracks = items.map(({ track: item }) => {
    return {
      id: item.id,
      name: item.name,
      artist: item.artists[0].name,
      imageUrl: item.album.images
        ? item.album.images[Math.min(1, item.album.images.length - 1)].url
        : "",
      link: item.href,
    };
  });

  return tracks;
}

export async function addTrackToPlaylist(
  track: Track,
  playlist: Playlist
): Promise<void> {
  fetchApi(
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
  fetchApi(`playlists/${playlist.id}/tracks`, {
    method: "DELETE",
    body: {
      tracks: [{ uri: `spotify:track:${track.id}` }],
    },
  });
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
        authorization: `Bearer ${API_TOKEN}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    }
  );
  const data = await res.json();

  return data;
}
