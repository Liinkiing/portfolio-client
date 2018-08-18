<template>
  <router-link :to="{name: 'project.view', params: { slug: project.slug } }" class="project-card" :style="style">
    <img :src="project.thumbnailUrl" :alt="project.title">
    <h3>{{ project.title }}</h3>
    <div class="content">
      <span class="icon-list platforms">
        <ProjectCardPlatform class="icon-list-item" v-for="platform in project.platforms" :platform="platform" :key="platform.id"/>
      </span>
      <span class="icon-list reverse languages">
        <ProjectCardLanguage class="icon-list-item" v-for="language in project.languages" :language="language" :key="language.id"/>
      </span>
    </div>
  </router-link>
</template>

<script>
  import * as Vibrant from 'node-vibrant'
  import {extractColor} from "../../utils/colors";
  import {CORS_ANYWHERE} from "../../utils/variables";
  import ProjectCardLanguage from "./ProjectCardLanguage";
  import ProjectCardPlatform from "./ProjectCardPlatform";

  export default {
    name: 'ProjectCard',
    components: {ProjectCardPlatform, ProjectCardLanguage},
    props: {
      project: {type: Object, required: true}
    },
    data() {
      return {
        proeminentColor: null
      }
    },
    async created() {
      const palette = await Vibrant.from(`${CORS_ANYWHERE}${this.project.thumbnailUrl}`).getPalette()
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
    transition: top $transition-duration;
    backface-visibility: hidden;
    top: 0;
    display: inline-flex;
    text-decoration: none;
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
        & .icon-list-item {
          margin-right: 0.5rem;
          &:last-of-type {
            margin-right: 0;
          }
        }
        &.reverse {
          left: auto;
          right: 1rem;
          flex-direction: row-reverse;
          & .icon-list-item {
            margin-right: auto;
            margin-left: 0.5rem;
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
      top: -12px;
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
