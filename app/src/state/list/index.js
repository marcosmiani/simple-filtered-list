import {
  createAsyncActions,
  createAsyncReducer
} from 'resynchronize'

import trafficMeister from '../../service'

export const setList = createAsyncActions('SET-LIST')

const fetchData = () => new Promise((resolve, reject) => {
  try {
    trafficMeister.fetchData((err, data) => {
      if (err) {
        console.warn(err)
        reject(err.message)
      } else {
        resolve(data)
      }
    })
  } catch (ex) {
    reject(ex.message)
  }
})

export const getList = (fetcher = fetchData) => (dispatch) => {
  dispatch(setList.START())
  return fetcher()
    .then(data => dispatch(setList.DONE(data)))
    .catch(ex => dispatch(setList.ERROR(ex)))
}

export default createAsyncReducer(
  setList,
  { reset: () => null }
)
