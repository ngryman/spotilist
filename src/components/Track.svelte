<script lang="ts">
  import type { Track } from "../types";

  export let track: Track;
</script>

<x-track>
  {track.name}
</x-track>

<style>
  x-track {
    font-size: 12px;
  }
</style>
