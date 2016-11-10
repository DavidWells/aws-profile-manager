import fs from 'fs'
import { parseAwsCredentials, getAwsCredentialsFilePath } from './aws'

const appendAwsCredentials = ({ profile, awsAccessKeyId, awsSecretAccessKey }) => {
  const credentialsPath = getAwsCredentialsFilePath()
  try {
    const content = [
      `[${profile}]\n`,
      `aws_access_key_id=${awsAccessKeyId}\n`,
      `aws_secret_access_key=${awsSecretAccessKey}\n\n`
    ].join('')
    fs.appendFileSync(credentialsPath, content)
    return parseAwsCredentials()
  } catch (err) {
    return {}
  }
}

export default appendAwsCredentials
