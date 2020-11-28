export const calculateImageSize = (imgWidth, imgHeight, windowWidth, windowHeight) => {
  const diffWidth = windowWidth - imgWidth
  const diffHeight = windowHeight - imgHeight
  const w = Math.abs(diffWidth)
  const h = Math.abs(diffHeight)
  let diffRation = windowWidth / imgWidth
  let newWidth = 0
  let newHeight = 0
  if (diffWidth < 0 && diffHeight < 0) {
    if (w < h) {
      diffRation = windowHeight / imgHeight
      newWidth = imgWidth * diffRation
      return [(windowWidth - newWidth) / 2, 0, newWidth, windowHeight]
    }
    newHeight = imgHeight * diffRation
    return [0, (windowHeight - newHeight) / 2, windowWidth, newHeight]

  }
  else if (diffWidth < 0) {
    return [0, (windowHeight - imgHeight) / 2, windowWidth, imgHeight]
  }
  else if (diffHeight < 0) {
    diffRation = windowHeight / imgHeight
    newWidth = imgWidth * diffRation
    return [(windowWidth - newWidth) / 2, 0, newWidth, windowHeight]
  }
  return [(windowWidth - imgWidth) / 2, (windowHeight - imgHeight) / 2, imgWidth, imgHeight]

}

export const saveData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getData = (key) => {
  const data = localStorage.getItem(key)
  if (data)
    return JSON.parse(data)
  else return []
}