<template>
  <div id="app">
    <transition name="zoom" mode="out-in">
      <router-view class="container"/>
    </transition>
    <transition name="zoom" mode="out-in">
      <GlobalLoader v-if="loading" with-background inline/>
    </transition>
  </div>
</template>

<style lang="scss">

</style>
<script>
  import GlobalLoader from "./components/ui/GlobalLoader";
  import {EventBus} from "./main";
  import {EVENT_GLOBAL_LOADER_START, EVENT_GLOBAL_LOADER_STOP} from "./utils/events";
  export default {
    components: {GlobalLoader},
    data() {
      return {
        loading: false
      }
    },
    created() {
      EventBus.$on(EVENT_GLOBAL_LOADER_START, () => {
        this.loading = true
      })
      EventBus.$on(EVENT_GLOBAL_LOADER_STOP, () => {
        this.loading = false
      })
    }
  }
</script>
