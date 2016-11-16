import { UPDATE_SERVICE } from '../constants/actions'

export default (service, valuePath, newValue) => {
  return {
    type: UPDATE_SERVICE,
    service,
    valuePath,
    newValue
  }
}

/*
export const create = (service) => dispatch => {

    return dispatch({
        type: ACTION,

        data: { ...service },

        sync: {
            method: 'POST',
            url: '/api/register',
        },
    }).then(res => {

        localStorage.setItem('id', res.response.id)
        localStorage.setItem('email', res.response.email)
        localStorage.setItem('token', res.response.token)

        client.setUser({ id: res.response.id, alias: res.response.email })

        return dispatch(AppActions.reload())

    }).then(() => {
        return dispatch(TopicActions.load())
    }, err => {
        throw err
    })
}
 */
