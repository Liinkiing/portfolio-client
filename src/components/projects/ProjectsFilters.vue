<template>
  <div class="projects-filters">
    <div class="filters">
      <router-link class="back" :to="{name: 'home'}">X</router-link>
      <div class="filters-category filters-platform">
        <div class="filter" v-for="platformCode in Object.keys(filters.platforms)"
             :key="platformCode" :class="{'active': filters.platforms[platformCode]}">
          <label>
            {{ platformName(platformCode) }}
            <input type="checkbox" v-model="filters.platforms[platformCode]">
          </label>
        </div>
      </div>
      <router-link :to="{}" class="filter-clear" :class="{'hidden': !hasFilters}">Clear</router-link>
      <div class="filters-category filters-language">
        <div class="filter" v-for="languageCode in Object.keys(filters.languages)"
             :key="languageCode" :class="{'active': filters.languages[languageCode]}">
          <label>
            {{ languageName(languageCode) }}
            <input type="checkbox" v-model="filters.languages[languageCode]">
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {DEFAULT_OPERATOR, LANGUAGE_NAMES_MAP, PLATFORM_NAMES_MAP} from "../../utils/variables";

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
            windows: false,
            web: false,
            macos: false
          }
        }
      }
    },
    computed: {
      hasFilters () {
        return [
          ...Object.entries(this.filters.languages).map(e => e[1]),
          ...Object.entries(this.filters.platforms).map(e => e[1])
        ].some(filter => filter === true)
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
          this.$router.replace({query: {...query, operator}})
        },
        deep: true
      }
    },
    methods: {
      languageName(languageCode) {
        return LANGUAGE_NAMES_MAP[languageCode]
      },
      platformName(platformCode) {
        return PLATFORM_NAMES_MAP[platformCode]
      },
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
    mounted() {
      this.updateFilters()
    }
  }
</script>

<style lang="scss" scoped>
  .projects-filters {
    max-width: 90%;
    margin: 0 auto;
    & .back {
      align-self: center;
      margin-right: 20px;
      text-decoration: none;
    }
    & .filters {
      display: flex;
      & .filters-category {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
      }
      & .filter-clear {
        transition: opacity 0.3s;
        display: flex;
        justify-content: center;
        align-self: center;
        padding: 0.7rem;
        text-decoration: none;
        flex: 1;
        margin: 0 20px;
        &.hidden {
          opacity: 0;
          visibility: hidden;
        }
      }
      & .filter {
        transition: all 0.1s;
        display: inline-flex;
        margin: 0.2rem;
        & label {
          transition: inherit;
          background: $green;
          padding: 0.25rem 0.5rem;
          border-radius: $main-border-radius;
          color: $white;
          &:hover {
            cursor: pointer;
            background: darken($green, 6%);
          }
        }
        &.active label {
          background: darken($green, 8%);
        }
        & input[type="checkbox"] {
          position: absolute;
          opacity: 0;
          visibility: hidden;
        }
      }
    }
  }
</style>
