<template>
    <ApolloQuery class="projects-container" :query="require('../../graphql/queries/ProjectsContainerQuery.graphql')">
      <template slot-scope="{ result: { data }, gqlError, isLoading }">
        <h2>Projets</h2>
        <template v-if="isLoading"></template>
        <template v-else>
          <transition-group tag="div" class="projects" name="fade-up" mode="out-in" appear
                            @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <ProjectCard
              v-for="(project, index) in data.projects.edges.map(edge => edge.node)"
              :key="project.id"
              :data-index="index"
              :project="project"
            />
          </transition-group>
        </template>


        <!--<div class="row center-xs">-->
          <!--<transition name="fade-up" mode="out-in" appear>-->
            <!--<Loader key="loader" v-if="isLoading" with-background inline/>-->
            <!--<div key="error" v-else-if="gqlError">{{ gqlError.message }}</div>-->
          <!--</transition>-->
        <!--</div>-->
      </template>
    </ApolloQuery>
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
  import {wait} from "../../utils/promises";
  import {appear, disappear} from "../../utils/animations";
  export default {
    components: {Loader, ProjectCard},
    methods: {
      beforeEnter (el) {
        el.style.opacity = 0
      },
      async enter (el, done) {
        const delay = el.dataset.index * 150
        await wait(delay)
        console.log('joue')
        appear(el, done)
      },
      async leave (el, done) {
        const delay = el.dataset.index * 150
        await wait(delay)
        disappear(el, done)
      }
    }
  }
</script>
