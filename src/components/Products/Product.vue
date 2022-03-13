<template>
  <v-container>
      <section class="product mt-3 elevation-10">
          <v-layout row wrap>
              <v-flex xs12 lg6>
                  <img src="https://image.ibb.co/cpScgo/ASUS_FX503_VD.jpg" class="product_img">
              </v-flex>
              <v-flex xs12 lg6>
                  <div class="product_info">
                      <h5 class="product_title display-1 mb-3 mt-3">Asus</h5>
                      <p class="product_category title">
                          <span class="product_title">Vendor:</span> Vendor Name
                      </p>
                      <p class="product_price title">
                          <span class="product_title">Price:</span>$1200
                      </p>
                      <p class="product_color title">
                          <span class="product_title">Color:</span>
                          <span
                              :title="purple"
                              :style="{ backgroundColor: 'purple' }"
                              class="product_color__bg"
                              >
                          </span>
                      </p>
                       <p class="title">
                          <span class="product_title">Material:</span> plastic                          
                      </p>
                      <div class="title mb-5">
                        <p class="product_title mb-2">Description</p> Lorem, ipsum dolor.
                      </div>
                      <v-btn color="primary" class="headline mr-3">Edit</v-btn>
                      <v-btn color="primary" class="headline">Buy</v-btn>
                  </div>
              </v-flex>
          </v-layout>
      </section>
  </v-container>
</template>

<script>
</script>
<style scoped>
.product {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border: 1px solid #1c77ad;
    padding: 30px;
    margin-bottom: 100px;
}
.product_img {
    height:100%;
    width:550px;
}
.product_info {
    margin-left: 50px;
}
.product_title {
    font-size: 1.6rem;
    font-weight: bold;
    color:#1875d0;
    margin-bottom: 0;
    margin-right:10px;
}
.product_category{
    color:green;
}
.product_price {
    color: red;
}
.product_color__bg{
    display: inline-block;
    width: 50px;
    height: 20px;
    border: 1px solid #2b2b2b;
    border-radius: 10px;
}
</style>
