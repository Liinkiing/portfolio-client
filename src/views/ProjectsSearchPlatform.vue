<template>
  <div class="projects-search">
    <ApolloQuery class="projects-container" :query="require('../graphql/queries/ProjectsSearchPlatformQuery.graphql')" :variables="{ platforms }">
      <template slot-scope="{ result: { data }, gqlError, isLoading }">
        <h2>Projets</h2>
        <ProjectsContainer v-if="data" :gql-error="gqlError" :is-loading="isLoading" :projects="data.searchProjects.edges.map(edge => edge.node)"/>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
  import Loader from "../components/ui/Loader";
  import ProjectsContainer from "../components/projects/ProjectsContainer";

  export default {
    name: 'ProjectView',
    components: {ProjectsContainer, Loader},
    props: {
      platforms: {type: Array, required: true}
    }
  }
</script>

<style lang="scss" scoped>

</style>
