<template>
    <ApolloQuery class="projects-container" :query="require('../../graphql/queries/ProjectsContainerQuery.graphql')">
      <template slot-scope="{ result: { data }, gqlError, isLoading }">
        <h2>Projets</h2>
        <div class="row center-xs">
          <transition name="fade-up" mode="out-in" appear>
            <Loader key="loader" v-if="isLoading" with-background inline/>
            <div key="error" v-else-if="gqlError">{{ gqlError.message }}</div>
            <div v-else-if="data" class="projects">
              <ProjectCard
                v-for="project in data.projects.edges.map(edge => edge.node)"
                :key="project.id"
                :project="project"
              />
            </div>
          </transition>
        </div>
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
  export default {
    components: {Loader, ProjectCard}
  }
</script>
