const generateUniqueId = (length: number) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const { random, floor } = Math

  let id = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = floor(random() * 62)
    id += chars[randomIndex]
  }

  return id
}

export default generateUniqueId
