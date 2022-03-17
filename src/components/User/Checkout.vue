<template>
  <v-container>
      <v-layout row>
          <v-flex xs12 class="text-center pt-5" v-if="loading">
                <v-progress-circular
                    :size="100"
                    :width="4"
                    color="purple"
                    indeterminate
                ></v-progress-circular>
          </v-flex>
          <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !==0">
              <h1 class="text-secondary mb-3">Orders</h1>
              <v-list
                subheader     
                two-line>   
                    <v-list-item 
                     v-for="(order, i) in orders"
                     :key="i"
                     >
                        <template>
                            <v-list-item-action>
                            <v-checkbox
                            color="success"
                            :input-value="order.done"
                             @change="markDone(order)"
                            ></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                            <v-list-item-title> {{ order.name }} </v-list-item-title>
                            <v-list-item-subtitle> {{ order.phone }} </v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                            <v-btn 
                             class="primary"
                             :to="'/product/' + order.productId"
                             >Open</v-btn>
                            </v-list-item-action>
                        </template>
                    </v-list-item>    
              </v-list>
          </v-flex>
          <v-flex xs12 class="text-center" v-else>
                <h1 class="text-secondary">You have no orders</h1>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
    computed: {
            loading () {
                return this.$store.getters.loading
            },
            orders () {
                return this.$store.getters.orders
            }
        },
    methods: {
        markDone (order) {
            order.done = true
        }
    },
    created () {
        this.$store.dispatch('fetchOrders')
    }
        
}
</script>
