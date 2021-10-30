export type Playlist = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
  total_tracks: number;
};

export type Track = {
  id: string;
  name: string;
  artist: string;
  duration_ms: number;
  imageUrl: string;
  link: string;
};

export type PlaylistItemToggleEventDetail = {
  playlist: Playlist;
  selected: boolean;
};

export type Device = {
  id: string;
  type: string;
  name: string;
};

export type Playback = {
  isPlaying: boolean;
  position: number;
};
