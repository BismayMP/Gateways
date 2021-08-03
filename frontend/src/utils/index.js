export const chnageDeviceStatus = (object) => {
  return object.status === 'online' ? 'offline' : 'online'
}
