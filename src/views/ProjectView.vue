<template>
  <div class="project-view">
    <transition-group name="fade-up" mode="out-in" appear>
      <div key="background" class="project-background-container" v-if="project" :style="backgroundStyle">
        <img class="background-image" :src="project.thumbnailUrl" :alt="project.title">
      </div>
      <div class="project-informations" v-if="project" :key="project.id" :style="foregroundStyle">
        <h2>{{ project.title }}</h2>
        <p>{{ project.description }}</p>
        <div class="project-body" v-html="project.body">{{ project.body }}</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import Loader from "../components/ui/Loader";
  import {getContrast, getVibrantColor} from "../utils/colors";

  export default {
    name: 'ProjectView',
    components: {Loader},
    props: {
      slug: {type: String, required: true}
    },
    data() {
      return {
        vibrantColor: null,
        color: null
      }
    },
    computed: {
      backgroundStyle() {
        return {
          background: this.vibrantColor
        }
      },
      foregroundStyle() {
        return {
          color: this.color
        }
      }
    },
    apollo: {
      project: {
        query: require('../graphql/queries/ProjectViewQuery.graphql'),
        variables() {
          return {
            slug: this.slug
          }
        },
        async result({ data: { project }, stale }) {
          if(stale !== undefined) {
            this.vibrantColor = await getVibrantColor(project.thumbnailUrl)
            this.color = getContrast(this.vibrantColor)
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes imageAppear {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes textAppear {
    0% {
      color: $darker;
    }
    25% {
      color: $darker;
    }
  }

  .project-view {
    & .project-background-container {
      position: fixed;
      animation: imageAppear 2s;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      &:after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: inherit;
        z-index: -1;
      }
    }
    & .background-image {
      animation: imageAppear 2s forwards;
      z-index: -2;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1.1);
      filter: blur(30px);
    }
    & .project-informations {
      position: relative;
      z-index: 1;
      animation: textAppear 2s;
    }
  }
</style>
