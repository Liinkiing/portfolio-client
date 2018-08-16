<template>
  <div class="project-card" :style="style">
    <img :src="project.thumbnailUrl" :alt="project.title">
    <h3>{{ project.title }}</h3>
    <div class="content">
      <span class="platforms">
        {{ project.platforms.map(platform => platform.name).join(', ') }}
      </span>
    </div>
  </div>
</template>

<script>
  import * as Vibrant from 'node-vibrant'
  import {extractColor} from "../../utils/colors";
  import {corsAnywhere} from "../../main";

  export default {
    name: 'ProjectCard',
    props: {
      project: {type: Object, required: true}
    },
    data() {
      return {
        proeminentColor: null
      }
    },
    async created() {
      const palette = await Vibrant.from(`${corsAnywhere}${this.project.thumbnailUrl}`).getPalette()
      this.proeminentColor = extractColor(palette)
      console.log(this.project.platforms)
    },
    computed: {
      style() {
        return {
          color: this.proeminentColor
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .project-card {
    transition: all $transition-duration;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 300px;
    height: 200px;
    border-radius: $card-border-radius;
    background-size: cover;
    color: $darker;
    box-shadow: $main-shadow-position;
    overflow: hidden;
    & .content {
      transition: all $transition-duration;
      position: relative;
      background: $white;
      flex: 1;
      top: 100%;
      & .platforms {
        position: absolute;
        left: 1rem;
        bottom: 1rem;
      }
    }
    & h3 {
      color: $white;
      text-shadow: $card-h3-shadow;
      background: transparentize($darker, 0.8);
      width: fit-content;
      padding: 0.75rem 1.5rem;
      margin: 1rem auto;
      border-radius: 3px;

    }
    & img {
      transition: all $transition-duration;
      position: absolute;
      z-index: -2;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &:after {
      transition: all $transition-duration;
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: inset 0 0 60px 30px;
    }
    &:hover {
      box-shadow: $darker-shadow-position;
      cursor: pointer;
      transform: translateY(-2px) scale(1.02);
      & img {
        filter: blur(3px);
        transform: scale(1.05);
        top: -50px;
      }
      &:after {
        box-shadow: inset 0 0 60px 10px;
      }
      & .content {
        top: 0;
      }
    }
    & > * {
      color: $darker;
    }
  }
</style>
