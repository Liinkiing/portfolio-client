<template>
  <div class="projects-search" >
    <ApolloQuery v-if="platform" class="projects-container" :query="require('../graphql/queries/ProjectsSearchPlatformQuery.graphql')" :variables="{ platforms }">
      <template slot-scope="{ result: { data }, gqlError, isLoading }">
        <h2>Affichage des projets tournant sur la plate-forme &laquo; {{ platform }} &raquo;</h2>
        <ProjectsContainer v-if="data" :gql-error="gqlError" :is-loading="isLoading" :projects="data.searchProjects.edges.map(edge => edge.node)"/>
      </template>
    </ApolloQuery>
    <template v-else>
      <h2>Cette plateforme n'existe pas !</h2>
    </template>
  </div>
</template>

<script>
  import Loader from "../components/ui/Loader";
  import ProjectsContainer from "../components/projects/ProjectsContainer";
  import {PLATFORM_NAMES_MAP} from "../utils/variables";

  export default {
    name: 'ProjectsSearchLanguage',
    components: {ProjectsContainer, Loader},
    props: {
      platforms: {type: Array, required: true}
    },
    computed: {
      platform() {
        return PLATFORM_NAMES_MAP[this.platforms.join('')]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
