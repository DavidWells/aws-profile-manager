import axios from 'axios'

export default function submitFeatureData(data, callback) {
  if (!data && !data.userData) {
    if (callback) {
      callback('Error no user data found')
    }
    return false
  }
  const array = Object.keys(data.formData)
  const userData = JSON.parse(data.userData)
  const airTableData = {
    fields: {
      Name: userData.name,
      'interested in': array,
      'Custom input': data.other,
      Email: userData.email,
      userdata: JSON.stringify(data.userData),
      'Date Added': new Date()
    }
  }
  axios({
    method: 'post',
    url: 'https://api.airtable.com/v0/appX7BRBYSs1iOCrr/feedback',
    data: airTableData,
    headers: {
      Authorization: 'Bearer keyWrghCH61ag6tA3',
    },
  })
  .then((response) => {
    if (callback) {
      callback(null, response)
    }
  })
  .catch((err) => {
    if (callback) {
      callback(err)
    }
  })
}
