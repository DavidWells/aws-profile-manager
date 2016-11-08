const nameRegex = new RegExp('[A-Za-z0-9_-]+')

export default (name) => !!name.match(nameRegex)
