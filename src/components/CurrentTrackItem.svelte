<script lang="ts">
  import type { Track } from "../types";
  import CurrentTrackControls from "./CurrentTrackControls.svelte";
  import TrackView from "./TrackView.svelte";

  export let track: Track;
</script>

<track-item>
  <TrackView {track} />
  <CurrentTrackControls />
</track-item>

<style>
  track-item {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background: #111;
  }
</style>
