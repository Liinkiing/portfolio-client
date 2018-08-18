<template>
  <div class="grid-view">
    <ApolloQuery :query="require('../graphql/queries/SearchProjectsViewQuery.graphql.graphql')"
                 :variables="{ languages, platforms, operator }">
      <template slot-scope="{ result: { data }, gqlError, isLoading }">
        <ProjectsFilters :operator="operator" :languages="languages" :platforms="platforms"/>
        <ProjectsContainer v-if="data" :projects="data.searchProjects.edges.map(edge => edge.node)" :gql-error="gqlError" :is-loading="isLoading"/>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
  import ProjectCard from "../components/projects/ProjectCard";
  import ProjectsContainer from "../components/projects/ProjectsContainer";
  import ProjectsFilters from "../components/projects/ProjectsFilters";
  import {DEFAULT_OPERATOR} from "../utils/variables";

  export default {
    name: "SearchProjects",
    components: {ProjectsFilters, ProjectsContainer, ProjectCard},
    props: {
      platforms: {type: Array, required: true, default: () => []},
      languages: {type: Array, required: true, default: () => []},
      operator: {type: String, required: true, default: DEFAULT_OPERATOR},
    },
  }
</script>

<style lang="scss" scoped>
  .projects {
    display: flex;
    flex-wrap: wrap;
    & > * {
      margin: 10px;
      /*display: inline-flex;*/
    }
  }

</style>
