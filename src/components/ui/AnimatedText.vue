<template>
  <component :is="tag" class="animated-text">
    <transition-group :css="false" appear
                      name="letter-appear"
                      @before-enter="beforeEnter"
                      @enter="enter"
                      @leave="leave">
      <span class="letter" v-for="(letter, index) in letters" :key="index" :data-index="index" v-html="letter">{{ letter }}</span>
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
      tag: {type: String, default: 'span'},
      delay: {type: Number, default: 50},
      duration: {type: Number, default: 100},
      offset: {type: Number, default: 0},
      enteringAnimation: {type: Function, default: letterAppear},
      leavingAnimation: {type: Function, default: letterDisappear},
    },
    methods: {
      beforeEnter(el) {
        el.style.opacity = FROM_LETTER_ANIMATED_OPACITY
        el.style.transform = FROM_LETTER_ANIMATED_TRANSFORM
        el.style.transformOrigin = 'top center'
      },
      enter(el, done) {
        const delay = ms((el.dataset.index * this.delay) + this.offset)
        this.enteringAnimation.call(this, el, done, delay, ms(this.duration));
      },
      leave(el, done) {
        const delay = ms((el.dataset.index * this.delay) + this.offset)
        this.leavingAnimation.call(this, el, done, delay, ms(this.duration));
      }
    },
    data() {
      return {
        letters: []
      }
    },
    created() {
      this.letters = this.$slots.default[0].text.split('').map(letter => letter === " " ? "&nbsp;" : letter)
    },
  }
</script>

<style lang="scss" scoped>
  .animated-text {
    & .letter {
      display: inline-block;
    }
  }
</style>
