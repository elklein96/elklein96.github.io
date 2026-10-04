<script setup lang="ts">
// Click-to-load YouTube embed: shows the thumbnail until played, so the page
// doesn't pull in YouTube's player (or its cookies) on load.
import { ref } from 'vue'
import { mdiPlay } from '@mdi/js'

const props = defineProps<{ youtubeId: string; title: string; thumbnail: string }>()
const playing = ref(false)
const src = `https://www.youtube-nocookie.com/embed/${props.youtubeId}?autoplay=1&playsinline=1`
</script>

<template>
  <div class="yt">
    <iframe
      v-if="playing"
      :src="src"
      :title="title"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
    />
    <button v-else type="button" :aria-label="`Play video: ${title}`" @click="playing = true">
      <img :src="thumbnail" alt="" loading="lazy" decoding="async" width="1080" height="1920" />
      <span class="play"><v-icon :icon="mdiPlay" size="32" /></span>
    </button>
  </div>
</template>

<style scoped>
.yt {
  position: relative;
  aspect-ratio: 9 / 16;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
}

.yt iframe,
.yt button,
.yt img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.yt button {
  padding: 0;
  cursor: pointer;
  background: none;
}

.yt img {
  object-fit: cover;
}

.play {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  transition: background 0.2s;
}

.yt button:hover .play,
.yt button:focus-visible .play {
  background: rgba(0, 0, 0, 0.8);
}
</style>
