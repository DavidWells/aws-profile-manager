import fs from 'fs'
import AWS from 'aws-sdk'
import getAwsCredentialsFilePath from './getAwsCredentialsFilePath'

const parseAwsCredentials = () => {
  const credentialsPath = getAwsCredentialsFilePath()
  try {
    const content = fs.readFileSync(credentialsPath).toString()
    return AWS.util.ini.parse(content)
  } catch (err) {
    return {}
  }
}

export default parseAwsCredentials
