import {CORS_ANYWHERE} from "./variables";
import * as Vibrant from 'node-vibrant'

export const extractColor = (palette, a = 0.5) => {
  const rgb = palette.Vibrant ? palette.Vibrant.getRgb() : palette.Muted.getRgb()

  const [r, g, b] = [Math.floor(rgb[0]), Math.floor(rgb[1]), Math.floor(rgb[2])]

  return `rgb(${r}, ${g}, ${b}, ${a})`
}

export const getVibrantColor = async (imageUrl, a = 0.5, corsEverywhere = true) => {
  const palette = await Vibrant.from(`${corsEverywhere ? CORS_ANYWHERE : ''}${imageUrl}`).getPalette()
  return extractColor(palette, a)
}

export const getContrast = rgba => {
  const match = new RegExp(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)
  const found = match.exec(rgba)
  const [r, g, b] = [found[1], found[2], found[3]]
  const o = Math.round(((parseInt(r) * 299) +
    (parseInt(g) * 587) +
    (parseInt(b) * 114)) / 1000);

  return (o > 128) ? 'black' : 'white';
}
