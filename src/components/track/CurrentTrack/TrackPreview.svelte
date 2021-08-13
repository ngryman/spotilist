<script lang="ts">
  import type { Track } from "@types";

  export let track: Track;
</script>

<track-view>
  <img src={track.imageUrl} alt="" />
  <strong>{track.name}</strong>
  <em>{track.artist}</em>
</track-view>

<style>
  track-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    margin-bottom: 10px;
    width: 150px;
    height: 150px;
  }

  em {
    font-style: normal;
    color: #ccc;
  }
</style>
