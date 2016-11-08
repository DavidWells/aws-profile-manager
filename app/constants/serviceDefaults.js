import Service from 'serverless/lib/classes/Service'
const service = new Service()

export const stage = service.defaults.stage
export const region = service.defaults.region
