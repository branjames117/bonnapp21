// quick function for converting from 24hr time to 12hr time

export default function timeConverter(time) {
  let hour = parseInt(time.slice(0, 2))
  let minute = parseInt(time.slice(2))
  let meridiem = hour >= 12 ? 'pm' : 'am'

  hour = hour >= 13 ? hour - 12 : hour
  hour = hour === 0 ? '12' : hour
  minute = minute < 10 ? '0' + minute : minute
  let convertedTime = hour + ':' + minute + meridiem

  return convertedTime
}
