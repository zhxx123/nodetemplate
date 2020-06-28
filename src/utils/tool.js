import { uuid } from 'vue-uuid'

export function getUUID() {
  const uid = uuid.v1()
  const res = uid.split('-').join('')
  return res
}
