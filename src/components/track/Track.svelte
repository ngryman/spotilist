<script lang="ts">
  import type { Track } from "@types";

  export let track: Track;
  export let current: boolean = false;
</script>

<x-track class:current>
  {track.name}
</x-track>

<style>
  x-track {
    font-size: 12px;
    color: #aaa;
  }

  x-track.current {
    color: #fff;
  }
</style>
