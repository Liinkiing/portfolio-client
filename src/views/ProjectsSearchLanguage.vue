<template>
  <div class="projects-search">
    <ApolloQuery v-if="language" class="projects-container" :query="require('../graphql/queries/ProjectsSearchLanguageQuery.graphql')" :variables="{ languages }">
      <template slot-scope="{ result: { data }, gqlError, isLoading }">
        <h2>Affichage des projets utilisant le langage &laquo; {{ language }} &raquo;</h2>
        <ProjectsContainer v-if="data" :gql-error="gqlError" :is-loading="isLoading" :projects="data.searchProjects.edges.map(edge => edge.node)"/>
      </template>
    </ApolloQuery>
    <template v-else>
      <h2>Ce langage n'existe pas !</h2>
    </template>
  </div>
</template>

<script>
  import Loader from "../components/ui/Loader";
  import ProjectsContainer from "../components/projects/ProjectsContainer";
  import {LANGUAGE_NAMES_MAP} from "../utils/variables";

  export default {
    name: 'ProjectsSearchLanguage',
    components: {ProjectsContainer, Loader},
    props: {
      languages: {type: Array, required: true}
    },
    computed: {
      language() {
        return LANGUAGE_NAMES_MAP[this.languages.join('')]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
