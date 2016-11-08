import path from 'path'

const getAwsCredentialsFilePath = () => {
  const { env } = process
  const home = env.HOME || env.USERPROFILE || (env.HOMEPATH ? ((env.HOMEDRIVE || 'C:/') + env.HOMEPATH) : null)

  if (!home) {
    throw new Error('Can\'t find home directory on your local file system.')
  }

  return path.join(home, '.aws', 'credentials')
}

export default getAwsCredentialsFilePath
