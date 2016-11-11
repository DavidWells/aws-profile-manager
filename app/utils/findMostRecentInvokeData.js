const sanitize = (value) => value
  .split('\\n')
  .join('\n')
  .split('\\"')
  .join('"')
  .split('\\\'')
  .join('\'')

export default (commands) => {
  const lastInvoke = commands.find((command) => command.name === 'invoke')
  if (lastInvoke) {
    const regexp = /--data "(.*)"/
    const match = lastInvoke.output.match(regexp)
    if (match && match[1]) {
      return sanitize(match[1])
    }
  }
  return null
}
