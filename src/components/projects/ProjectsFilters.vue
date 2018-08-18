<template>
    <div class="projects-filters">
      <router-link :to="{name: 'home'}">Retour</router-link>
      <router-link :to="{}">Reset</router-link>
      <label>
        HTML
        <input type="checkbox" v-model="filters.languages.html">
      </label>
      <label>
        JavaScript
        <input type="checkbox" v-model="filters.languages.javascript">
      </label>
      <label>
        CSS
        <input type="checkbox" v-model="filters.languages.css">
      </label>
      <label>
        PHP
        <input type="checkbox" v-model="filters.languages.php">
      </label>
      <label>
        C#
        <input type="checkbox" v-model="filters.languages.csharp">
      </label>
      <label>
        Android
        <input type="checkbox" v-model="filters.platforms.android">
      </label>
      <label>
        MacOS
        <input type="checkbox" v-model="filters.platforms.macos">
      </label>
      <label>
        Linux
        <input type="checkbox" v-model="filters.platforms.linux">
      </label>
      <label>
        Windows
        <input type="checkbox" v-model="filters.platforms.windows">
      </label>
      <label>
        Web
        <input type="checkbox" v-model="filters.platforms.web">
      </label>
      <label>
        ET
        <input type="radio" name="operator" value="and" v-model="filters.operator">
      </label>
      <label>
        OU
        <input type="radio" name="operator" value="or" v-model="filters.operator">
      </label>
    </div>
</template>

<script>
  import {DEFAULT_OPERATOR} from "../../utils/variables";

  export default {
    name: "ProjectsFilters",
    props: {
      platforms: {type: Array, required: true, default: () => []},
      languages: {type: Array, required: true, default: () => []},
      operator: {type: String, required: true, default: DEFAULT_OPERATOR},
    },
    data() {
      return {
        filters: {
          operator: 'and',
          languages: {
            html: false,
            javascript: false,
            csharp: false,
            php: false,
            css: false,
          },
          platforms: {
            android: false,
            linux: false,
            web: false,
            macos: false
          }
        }
      }
    },
    watch: {
      '$route.query'() {
        this.updateFilters()
      },
      filters: {
        handler(filters) {
          const operator = this.filters.operator
          const query = {}
          Object.keys(filters).forEach(key => {
            if (typeof filters[key] !== 'object') return;
            query[key] = Object.entries(filters[key])
              .map(filter => filter[1] === true ? filter[0] : null)
              .filter(Boolean)
              .join(',')
            if (query[key] === "") delete query[key]
          })
          this.$router.replace({query: { ...query, operator } })
        },
        deep: true
      }
    },
    methods: {
      updateFilters() {
        Object.keys(this.filters.languages).forEach(key => {
          this.filters.languages[key] = false
        })
        Object.keys(this.filters.platforms).forEach(key => {
          this.filters.platforms[key] = false
        })
        this.languages.forEach(language => {
          this.filters.languages[language] = true
        })
        this.platforms.forEach(platform => {
          this.filters.platforms[platform] = true
        })
        this.filters.operator = this.operator.toLowerCase()
      }
    },
    mounted () {
      this.updateFilters()
    }
  }
</script>

<style lang="scss" scoped>

</style>
