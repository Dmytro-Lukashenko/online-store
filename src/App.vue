<template>
  <v-app>
    <navbar/>
    <template v-if="error">
    <v-snackbar
      :multi-line="true"
      :timeout="5000"
      color="error"
      @input="closeError"
      :value="true"
    >
      {{ error }}
      <template>
        <v-btn
          dark
          text          
          @click.native="closeError"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    </template>
  </v-app>
</template>

<script>
import navbar from './components/Navbar/Navbar'
export default {
  components: {
    navbar
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  }
}
</script>
