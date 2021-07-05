<template>
  <main class="container-fluid">
    <!-- loading -->

    <div
      v-if="sandbagLocations.loading"
      class="d-flex justify-content-center my-5"
    >
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- error -->
    <div
      v-else-if="sandbagLocations.error"
      class="alert alert-warning"
      role="alert"
    >
      <p>Unable to load Sandbag Locations at this time.</p>
      <code v-text="sandbagLocations.error"></code>
    </div>

    <!-- data -->

    <div v-else>
      <div v-if="sandbagLocations.data.length" class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Location</th>
              <!-- <th>Address</th> -->
              <th>Start Time</th>
              <th>End Time</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ id, fields } in sandbagLocations.data" :key="id">
              <td>
                <a :href="`${fields.LocationUrl.join(' ')}`" target="_blank">
                  {{ fields.LocationName.join(' ') }}
                </a>
              </td>
              <!-- <td>{{ fields.LocationAddress.join(' ') }}</td> -->
              <td>{{ formatDate(fields.StartTime) }}</td>
              <td>{{ formatDate(fields.EndTime) }}</td>
              <td>{{ fields.Notes }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="alert alert-info" role="alert">
        No locations are currently providing sandbags.
      </div>

      <!-- <pre>{{ sandbagLocations }}</pre> -->
    </div>
  </main>
</template>

<script>
import { sandbagLocations, fetchSandbagLocations } from './lib'

function formatDate(date) {
  return new Date(date).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
  })
}

export default {
  setup() {
    fetchSandbagLocations()
    return { sandbagLocations, formatDate }
  },
}
</script>

<style lang="scss" src="./assets/main.scss"></style>
