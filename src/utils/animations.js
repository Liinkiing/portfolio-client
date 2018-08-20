import {TweenLite} from 'gsap'
import {
  FROM_CARD_TRANSFORM, FROM_LETTER_ANIMATED_OPACITY, FROM_LETTER_ANIMATED_TRANSFORM,
  TO_CARD_TRANSFORM,
  TO_LETTER_ANIMATED_OPACITY,
  TO_LETTER_ANIMATED_TRANSFORM
} from "./variables";


export const letterAppear = ($el, done, delay = 0, duration = 0.1) => {
  return TweenLite
    .to($el, duration, {
      opacity: TO_LETTER_ANIMATED_OPACITY,
      transform: TO_LETTER_ANIMATED_TRANSFORM
    })
    .delay(delay)
    .eventCallback('onComplete', done)
}

export const letterDisappear = ($el, done, delay = 0, duration = 0.1) => {
  return TweenLite
    .to($el, duration, {
      opacity: FROM_LETTER_ANIMATED_OPACITY,
      transform: FROM_LETTER_ANIMATED_TRANSFORM
    })
    .delay(delay)
    .eventCallback('onComplete', done)
}



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
