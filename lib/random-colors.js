export default function randomColorGenerator() {
  const randomColors = [
    'rgb(59, 131, 224)', // blue
    'rgb(88, 226, 111)', // green
    'rgb(215, 88, 231)', // pink
    'rgb(255, 155, 41)', // orange
    'yellow',
  ]
  return randomColors[Math.floor(Math.random() * randomColors.length)]
}
