<template>
      <div class="row center-xs">
        <transition name="fade-up" mode="out-in" appear>
          <Loader key="loader" v-if="isLoading" with-background fixed inline/>
          <transition-group v-else-if="projects" tag="div" class="projects" name="flip-list" appear
                            @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <ProjectCard
              v-for="(project, index) in projects"
              :key="project.id"
              :data-index="index"
              :project="project"
            />
          </transition-group>
          <div key="error" v-else-if="gqlError">{{ gqlError.message }}</div>
        </transition>
      </div>
</template>

<style lang="scss" scoped>
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
  import {FROM_CARD_TRANSFORM, TRANSITION_DURATION} from "../../utils/variables";

  export default {
    components: {Loader, ProjectCard},
    props: {
      projects: {type: Array, required: true},
      gqlError: {required: false},
      isLoading: {required: false},
    },
    methods: {
      initStyles(el) {
        el.style.opacity = 0
        el.style.transform = FROM_CARD_TRANSFORM
        el.style.transformOrigin = 'top center'
      },
      clearStyles(el) {
        el.style.transform = null
        el.style.transformOrigin = null
        el.style.opacity = null
        el.style.transition = `all ${TRANSITION_DURATION}s`
      },
      beforeEnter(el) {
        this.initStyles(el)
      },
      enter(el, done) {
        const delay = ms(el.dataset.index * 150)
        appear(el, () => {
          this.clearStyles(el);
          done();
        }, delay);
      },
      leave(el, done) {
        const delay = ms(el.dataset.index * 150)
        disappear(el, () => {
          this.initStyles(el);
          done();
        }, delay);
      }
    }
  }
</script>
