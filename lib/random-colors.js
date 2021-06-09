export default function randomColorGenerator() {
  const randomColors = [
    'rgb(59, 131, 224)',
    'rgb(88, 226, 111)',
    'rgb(215, 88, 231)',
    'rgb(255, 155, 41)',
    'yellow',
  ]
  return randomColors[Math.floor(Math.random() * randomColors.length)]
}
