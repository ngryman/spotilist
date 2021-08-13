<script lang="ts">
  import type { Track } from "../../types";
  import Playback from "./Playback.svelte";
  import TrackPreview from "./TrackPreview.svelte";

  export let track: Track;
</script>

<track-item>
  <TrackPreview {track} />
  <Playback />
</track-item>

<style>
  track-item {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 20px 40px;
    background: #111;
  }
</style>
