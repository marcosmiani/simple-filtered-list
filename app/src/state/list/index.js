import {
  createAsyncActions,
  createAsyncReducer
} from 'resynchronize'

export const requestList = createAsyncActions('REQUEST-LIST')

export default createAsyncReducer(requestList)
