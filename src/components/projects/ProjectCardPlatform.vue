<template>
  <router-link :to="{name: 'projects.platform', params: { platform: platform.slug } }" class="project-card-platform">
    <img class="icon" :src="platform.iconUrl" :alt="platform.name" :key="platform.id">
  </router-link>
</template>

<script>
  export default {
    name: 'ProjectCardPlatform',
    props: {
      platform: {type: Object, required: true}
    }
  }
</script>

<style lang="scss" scoped>
.project-card-platform {
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
