import {
  SAVE_PRESENTATION, DELETE_PRESENTATION, GET_PRESENTATION,
  RUN_PRESENTATION, CLOSE_PRESENTATION, UNDO_ADDING_ITEM, REDO_ADDING_ITEM
} from 'utils/presentationConsts'

import { saveData, showToast } from 'utils/utils'

export const presentationReducer = (state, action) => {
  switch (action.type) {
    case SAVE_PRESENTATION:
      {
        const existing = state.filter(pr => pr.id !== action.payload.id)
        const newData = [...existing, action.payload]
        showToast("Data succesufully saved", "success", 1000)
        saveData('presentations', newData)
        return newData
      }
    case DELETE_PRESENTATION:
      return [...state]
    case GET_PRESENTATION:
      return [...state]
    case RUN_PRESENTATION:
      return [...state]
    case CLOSE_PRESENTATION:
      return [...state]
    case UNDO_ADDING_ITEM:
      return [...state]
    case REDO_ADDING_ITEM:
      return [...state]
    default:
      return state
  }
}