<template>
  <v-container>
      <section class="product mt-3 elevation-10" v-if="!loading">
          <v-layout row wrap>
              <v-flex xs12 lg6>
                  <img :src="product.imageSrc" class="product_img">
              </v-flex>
              <v-flex xs12 lg6>
                  <div class="product_info">
                      <h5 class="product_title display-1 mb-3 mt-3">{{ product.title }}</h5>
                      <p class="product_category title">
                          <span class="product_title">Vendor:</span> {{ product.vendor.charAt(0).toUpperCase() + product.vendor.substr(1)}}
                      </p>
                      <p class="product_price title">
                          <span class="product_title">Price:</span>{{ product.price }}
                      </p>
                      <p class="product_color title">
                          <span class="product_title">Color:</span>
                          <span
                              :title="product.color"
                              :style="{ backgroundColor:  product.color }"
                              class="product_color__bg"
                              >
                          </span>
                      </p>
                       <p class="title">
                          <span class="product_title">Material:</span> {{ product.material.charAt(0).toUpperCase() + product.material.substr(1)}}                          
                      </p>
                      <div class="title mb-5">
                        <p class="product_title mb-2">Description</p> {{ product.description }}
                      </div>
                      <edit-product :product="product" v-if="isOwner"></edit-product>
                      <app-buy-dialog :product="product"></app-buy-dialog>
                  </div>
              </v-flex>
          </v-layout>
      </section>
      <section v-else calss="text-center">
        <v-container>
            <v-layout row>
              <v-flex xs12 class="text-center pt-5">
                <v-progress-circular
                    :size="100"
                    :width="4"
                    color="purple"
                    indeterminate
                ></v-progress-circular>
              </v-flex>
            </v-layout>
        </v-container>
      </section>
  </v-container>
</template>

<script>
import EditProduct from '../Product/Product'
export default {
    components:{
        EditProduct,
    },
    props: {
        id: {
            type: String,
            rquired:true
        }
    },
    computed: {
        product() {
            const id = this.id            
            return this.$store.getters.productById(id)
        },
        loading() {
            return this.$store.getters.loading
        },
        isOwner() {
            return this.product.ownerId === this.$store.getters.user.id
        }
    }
}
</script>
<style lang="scss" scoped>
@import './Product.scss'
</style>
