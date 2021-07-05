import axios from 'axios'
import { createWriteStream } from 'fs'
import { resolve } from 'path'

const airtable = axios.create({
  baseURL: 'https://api.airtable.com/v0/appnFW9fJzyBNXQnz',
  // commbocc@gmail.com account read only api key
  headers: { Authorization: `Bearer key1XrFuYhG1GKHvu` },
})

const fetchAndSaveTable = async (name, params = {}) => {
  try {
    const { data } = await airtable.get(`/${name}`, {
      params,
      responseType: 'stream',
    })

    data.pipe(createWriteStream(resolve(`./public/${name}.json`)))
  } catch (error) {
    // error
    // 401 unauth
    // 422 (Unprocessable Entity)
    console.warn(error.message)
  } finally {
    // loading = false
    console.log(`finished ${name}`)
  }
}

fetchAndSaveTable('sandbags', {
  // filterByFormula: ``,
  view: 'AppView',
})
