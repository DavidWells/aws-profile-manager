// Copied from the internal validation: https://github.com/serverless/serverless/blob/dce44fc2493839bd93d1c21c5312035f72f91e64/lib/plugins/aws/deploy/lib/createStack.js#L42
export default (name) => !(/^[^a-zA-Z].+|.*[^a-zA-Z0-9-].*/.test(name) || name.length > 128)
