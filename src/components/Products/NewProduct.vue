<template>
  <v-container>
      <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
              <h1 class="text-secondary mb-3">Create New Product</h1>
              <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                      >
                          <v-text-field
                            prepend-icon="mdi-account"
                            name="email"
                            label="Email"
                            type="email"
                            v-model="email"                           
                            required
                            :rules="emailRules"
                            >
                          </v-text-field>
                          <v-text-field
                            prepend-icon="mdi-lock"
                            name="password"
                            label="Pasword"
                            type="password"
                            v-model="password"
                            :counter="6"
                            :rules="passwordRules"
                            >
                          </v-text-field>
                      </v-form>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
