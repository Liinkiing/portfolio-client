<template>
  <div class="row center-xs">
    <transition name="zoom" appear>
      <transition-group v-if="projects && delayedAppear" class="projects" name="list" tag="div" appear
                        @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <ProjectCard
          v-for="(project, index) in projects"
          class="list-item"
          :key="project.id"
          :data-index="index"
          :project="project"
        />
      </transition-group>
      <transition-group v-else-if="projects && !delayedAppear" class="projects" name="list" tag="div">
        <ProjectCard
          v-for="project in projects"
          class="list-item"
          :key="project.id"
          :project="project"
        />
      </transition-group>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  .list-item {
    transition: all 0.3s;
    display: inline-flex;
  }

  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-leave-active {
    position: absolute;
  }

  .projects {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    & .project-card {
      margin: 0.5rem;
    }
  }
</style>
<script>
  import ProjectCard from "./ProjectCard";
  import Loader from "../ui/Loader";
  import {appear, disappear} from "../../utils/animations";
  import {ms} from "../../utils/numbers";
  import {FROM_CARD_TRANSFORM} from "../../utils/variables";

  export default {
    components: {Loader, ProjectCard},
    props: {
      projects: {type: Array, required: true},
      delayedAppear: {type: Boolean, required: false, default: false},
    },
    methods: {
      beforeEnter(el) {
        el.style.opacity = 0
        el.style.transform = FROM_CARD_TRANSFORM
        el.style.transformOrigin = 'top center'
      },
      enter(el, done) {
        const delay = ms(el.dataset.index * 150)
        appear(el, done, delay);
      },
      leave(el, done) {
        const delay = ms(el.dataset.index * 150)
        disappear(el, done, delay);
      }
    }
  }
</script>
