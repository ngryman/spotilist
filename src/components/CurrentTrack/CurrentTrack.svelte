<script lang="ts">
  import type { Track } from "../../types";
  import Controls from "./Controls.svelte";
  import TrackPreview from "./TrackPreview.svelte";

  export let track: Track;
</script>

<track-item>
  <TrackPreview {track} />
  <Controls />
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
