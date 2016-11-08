import { spawn } from 'child_process'
/* default spawn is a black box. This adds debug utils to it */

export default function betterSpawn(...args) {
  console.log('spawn args', args)
  const result = spawn.apply(this, args)
  return result
}
