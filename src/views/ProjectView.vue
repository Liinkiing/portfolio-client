<template>
    <ApolloQuery class="project-view" :query="require('../graphql/queries/ProjectViewQuery.graphql')" :variables="{ slug }">
      <template slot-scope="{ result: { data }, gqlError, isLoading }">
        <transition name="fade-up" mode="out-in" appear>
          <div class="project-informations" v-if="data && data.project" :key="data.project.id">
            <h2>{{ data.project.title }}</h2>
            <p>{{ data.project.description }}</p>
            <div class="project-body" v-html="data.project.body">{{ data.project.body }}</div>
          </div>
          <h2 key="error" v-else-if="gqlError">{{ gqlError.message }}</h2>
        </transition>
      </template>
    </ApolloQuery>
</template>

<script>
  import Loader from "../components/ui/Loader";

  export default {
    name: 'ProjectView',
    components: {Loader},
    props: {
      slug: {type: String, required: true}
    }
  }
</script>

<style lang="scss" scoped>

</style>
