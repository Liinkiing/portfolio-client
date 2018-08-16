<template>
  <router-link :to="{name: 'projects.language', params: { language: language.slug }}" class="project-card-language">
    <img class="icon" :src="language.iconUrl" :alt="language.name" >
  </router-link>
</template>

<script>
  export default {
    name: 'ProjectCardLanguage',
    props: {
      language: {type: Object, required: true}
    }
  }
</script>

<style lang="scss" scoped>
.project-card-language {
  & .icon {
    transition: opacity $transition-duration;
    width: 14px;
    height: 14px;
    display: inline-flex;
    position: relative;
    z-index: 2;
    margin-right: 1rem;
    opacity: 0.5;
    &:hover {
      opacity: 0.9;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>
