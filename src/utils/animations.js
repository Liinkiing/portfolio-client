import {TweenLite} from 'gsap'
import {FROM_CARD_TRANSFORM, TO_CARD_TRANSFORM} from "./variables";



export const appear = ($el, done, delay = 0, duration = 0.1) => {
  return TweenLite
    .to($el, duration, {
      opacity: 1,
      transform: TO_CARD_TRANSFORM
    })
    .delay(delay)
    .eventCallback('onComplete', done)
}

export const disappear = ($el, done, delay = 0, duration = 0.1) => {
  return TweenLite
    .to($el, duration, {
      opacity: 0,
      transform: FROM_CARD_TRANSFORM
    })
    .delay(delay)
    .eventCallback('onComplete', done)
}
