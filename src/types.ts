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
  imageUrl: string;
  link: string;
};

export type PlaylistItemToggleEventDetail = {
  playlist: Playlist;
  selected: boolean;
};
