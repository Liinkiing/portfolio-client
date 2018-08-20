<template>
  <div class="home">
    <ApolloQuery class="projects-container" :query="require('../graphql/queries/ProjectsContainerQuery.graphql')">
      <template slot-scope="{ result: { data }, gqlError, isLoading }">
        <h2>Projets</h2>
        <ProjectsContainer v-if="data"
                           :projects="data.projects.edges.map(edge => edge.node)"
                           delayed-appear/>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
  import ProjectsContainer from "../components/projects/ProjectsContainer";
  import AnimatedText from "../components/ui/AnimatedText";
  export default {
    name: 'Home',
    components: {AnimatedText, ProjectsContainer},
  }
</script>

<style lang="scss" scoped>

</style>
