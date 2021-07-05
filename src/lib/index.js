import axios from 'axios'
import { reactive } from 'vue'

export const sandbagLocations = reactive({
  error: '',
  loading: false,
  data: [],
})

export async function fetchSandbagLocations() {
  sandbagLocations.loading = true
  try {
    const { data } = await axios.get('/sandbags.json')

    sandbagLocations.data = data.records
  } catch (error) {
    sandbagLocations.error = error.message
  } finally {
    sandbagLocations.loading = false
  }
}
