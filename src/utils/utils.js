import { toast } from "react-toastify"

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

export const openFullscreen = () => {
  const elem = document.documentElement
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
export const closeFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

export const showToast = (message, type = "info", duration = 1000) => {
  console.log(message)
  toast.configure({
    position: "top-center",
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
  switch (type) {
    case "info":
      toast.info(message)
      break
    case "success":
      toast.success(message)
      break
    case "warning":
      toast.warning(message)
      break
    case "error":
      toast.error(message)
      break
    case "dark":
      toast.dark(message)
      break
    default:
      toast(message)

  }
}