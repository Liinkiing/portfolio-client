export const extractColor = (palette, a = 0.5) => {
  const rgb = palette.Vibrant ? palette.Vibrant.getRgb() : palette.Muted.getRgb()

  const [r, g, b] = [Math.floor(rgb[0]), Math.floor(rgb[1]), Math.floor(rgb[2])]

  return `rgb(${r}, ${g}, ${b}, ${a})`
}
