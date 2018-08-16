import Velocity from 'velocity-animate'

export const appear = ($el, done) => {
  Velocity(
    $el,
    { opacity: 1 },
    { complete: done }
  )
}

export const disappear = ($el, done) => {
  Velocity(
    $el,
    { opacity: 0 },
    { complete: done }
  )
}
