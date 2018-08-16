<template>
  <div class="project-card" :style="style">
    <img :src="project.thumbnailUrl" :alt="project.title">
    <h3>{{ project.title }}</h3>
    <div class="content">
      <span class="icon-list platforms">
        <img class="icon" v-for="platform in project.platforms" :src="platform.iconUrl" :alt="platform.name" :key="platform.id">
      </span>
      <span class="icon-list reverse languages">
        <img class="icon" v-for="language in project.languages" :src="language.iconUrl" :alt="language.name" :key="language.id">
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
      & .icon-list {
        position: absolute;
        display: flex;
        left: 1rem;
        bottom: 1rem;
        & .icon {
          transition: all $transition-duration;
          width: 14px;
          height: 14px;
          display: inline-flex;
          position: relative;
          z-index: 2;
          margin-right: 1rem;
          opacity: 0.5;
          &:hover {
            opacity: 0.9;
          }
          &:last-of-type {
            margin-right: 0;
          }
        }
        &.reverse {
          left: auto;
          right: 1rem;
          flex-direction: row-reverse;
          & .icon {
            margin-right: auto;
            margin-left: 1rem;
            &:last-of-type {
              margin-left: 0;
            }
          }
        }
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
    & > img {
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
      & > img {
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
