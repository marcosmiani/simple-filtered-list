import {
  createAsyncActions,
  createAsyncReducer
} from 'resynchronize'

export const setList = createAsyncActions('REQUEST-LIST')

export const getRequestList = (dispatch) => {
  try {
    dispatch(setList.START())

    dispatch(setList.DONE())
  } catch (ex) {
    dispatch(setList.ERROR())
  }
}

export default createAsyncReducer(setList)
