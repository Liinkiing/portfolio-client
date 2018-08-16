<template>
  <div class="loader-fixed">
    <div class="loader" :class="{'loader-inline': inline, 'with-background': withBackground}">
      <img src="../../assets/images/tail-spin.svg" class="loader-icon" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "GlobalLoader",
  props: {
    inline: { type: Boolean, required: false, default: false },
    withBackground: { type: Boolean, required: false, default: false },
  }
};
</script>

<style lang="scss" scoped>
.loader-fixed {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & .loader {
    &.loader-inline {
      display: inline-flex;
    }
    &.with-background {
      padding: 20px;
      background: transparentize($darker, 0.4);
      border-radius: $card-border-radius;
    }
  }
}
</style>
