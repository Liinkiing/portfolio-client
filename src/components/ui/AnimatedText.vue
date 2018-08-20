<template>
  <component :is="tag" class="animated-text">
    <slot v-if="letters.length === 0"></slot>
    <transition-group :css="false" appear
                      name="letter-appear"
                      @before-enter="beforeEnter"
                      @enter="enter"
                      @leave="leave">
      <span v-for="(letter, index) in letters" :key="index" :data-index="index">{{ letter }}</span>
    </transition-group>
  </component>
</template>

<script>
  import {FROM_LETTER_ANIMATED_OPACITY, FROM_LETTER_ANIMATED_TRANSFORM} from "../../utils/variables";
  import {ms} from "../../utils/numbers";
  import {letterAppear, letterDisappear} from "../../utils/animations";

  export default {
    name: 'AnimatedText',
    props: {
      tag: {type: String, default: 'span'}
    },
    methods: {
      beforeEnter(el) {
        el.style.opacity = FROM_LETTER_ANIMATED_OPACITY
        el.style.transform = FROM_LETTER_ANIMATED_TRANSFORM
        el.style.transformOrigin = 'top center'
      },
      enter(el, done) {
        console.log('cc')
        const delay = ms(el.dataset.index * 150)
        letterAppear(el, done, delay);
      },
      leave(el, done) {
        console.log('cc')
        const delay = ms(el.dataset.index * 150)
        letterDisappear(el, done, delay);
      }
    },
    data() {
      return {
        letters: []
      }
    },
    created() {
      this.letters = this.$slots.default[0].text.split('')
    },
  }
</script>

<style lang="scss" scoped>

</style>
