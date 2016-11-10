import path from 'path'
import fs from 'fs'

/*
  Returns string of path to aws file
*/
export const getAwsCredentialsFilePath = () => {
  const { env } = process
  const home = env.HOME || env.USERPROFILE || (env.HOMEPATH ? ((env.HOMEDRIVE || 'C:/') + env.HOMEPATH) : null)
  if (!home) {
    throw new Error('Can\'t find home directory on your local file system.')
  }
  return path.join(home, '.aws', 'credentials')
}



/*
  Returns string of contents of aws crendentials file
*/
export const getAwsCredentialsFile = () => {
  const credentialsPath = getAwsCredentialsFilePath()
  try {
    return fs.readFileSync(credentialsPath).toString()
  } catch (err) {
    return {}
  }
}

/*
  Returns object of AWS profiles
*/
export const parseAwsCredentials = () => {
  const fileContents = getAwsCredentialsFile()
  console.log('fileContents', fileContents)
  const profiles = {}
  const lines = fileContents.split(/\r?\n/)
  let currentSection
  lines.forEach((line) => {
    const lineData = removeCommentsFromString(line)
    const section = lineData.match(/^\s*\[([^[\]]+)]\s*$/)
    if (section) {
      currentSection = section[1]
    } else if (currentSection) {
      const item = lineData.match(/^\s*(.+?)\s*=\s*(.+?)\s*$/)
      if (item) {
        profiles[currentSection] = profiles[currentSection] || {}
        profiles[currentSection][item[1]] = item[2]
      }
    }
  })
  return profiles
}

export function updateAwsProfile(profileName, values) {

  const awsCredentialsFile = getAwsCredentialsFile()
  console.log('ran', awsCredentialsFile)
  // do backup here
  /* pattern /^\s*\[default((.|\n)*?.*^(\[|\s)/gm */
  const pattern = new RegExp(`^\s*\\[${profileName}((.|\\n)*?.*^(\\[|\\s))`, "gm") // eslint-disable-line
  const creds = awsCredentialsFile.match(pattern)
  console.log('creds match', creds)
  if (creds) {
    const accessKey = getAccessKey(creds[0])
    const secretKey = getSecretAccessKey(creds[0])
    if (!accessKey || !secretKey) {
      throw 'AWS credentials file malformed'
    }
    console.log('accessKey string', accessKey[0])
    console.log('secretKey string', secretKey[0])
    // do replacments
  } else {
    // Single or last value in the file
    console.log('Single profile or last profile match')
    const singlePattern = new RegExp(`^\s*\\[${profileName}(.|\\n)*`, "gm") // eslint-disable-line
    const singleCreds = awsCredentialsFile.match(singlePattern)
    // console.log(singleCreds)
    if (singleCreds) {
      const accessKey = getAccessKey(singleCreds[0])
      const secretKey = getSecretAccessKey(singleCreds[0])
      if (!accessKey || !secretKey) {
        throw 'AWS credentials file malformed'
      }
      console.log('single', secretKey[1])
      console.log('single access', accessKey[1])
      // do replacements
    }
  }
  // const t = file.match(/^\s*\[default(\s*?.*?)*?\s*\[/gm)
}

/*
  Returns array
*/
function getAccessKey(text) {
  return text.match(/^aws_access_key_id=([a-zA-Z0-9\S]*)/m)
}
/*
  Returns array
*/
function getSecretAccessKey(text) {
  return text.match(/^aws_secret_access_key=([a-zA-Z0-9\S]*)/m)
}
/*
  Returns string minus comments
*/
function removeCommentsFromString(text) {
  return (text) ? text.split(/(^|\s)[;#]/)[0] : ''
}
