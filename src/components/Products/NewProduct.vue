<template>
  <v-container>
      <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
              <h1 class="text-secondary mb-3">Create New Product</h1>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="mb-3"
                >
                    <v-text-field                    
                     name="title"
                     label="Title"
                     type="title"
                     v-model="title"                           
                     required      
                     :rules="[v => !!v || 'Title is require']"
                    ></v-text-field>
                    <v-text-field                    
                     name="vendor"
                     label="Product Vendor"
                     type="text"
                     v-model="vendor"                    
                    ></v-text-field>
                    <v-text-field                    
                     name="color"
                     label="Product Color"
                     type="text"
                     v-model="color"                    
                    ></v-text-field>
                    <v-text-field                    
                     name="material"
                     label="Product Material"
                     type="text"
                     v-model="material"                    
                    ></v-text-field>
                    <v-text-field                    
                     name="price"
                     label="Product Price"
                     type="text"
                     :rules="[v => !!v || 'Title is require']"
                     required
                     v-model="price"                    
                    ></v-text-field>
                    <v-text-field                    
                     name="description"
                     label="Product Description"
                     type="text"
                     multi-line
                     v-model="description"                    
                    ></v-text-field>
            </v-form>
            <v-layout class="mb-3">
                <v-flex xs12>
                    <v-btn class="warning">
                        Upload
                        <v-icon right dark size="25px">mdi-cloud-upload</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs12>
                    <img
                     src=""
                     height = "200px"
                    >                    
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs12>
                   <v-switch
                    color="primary"
                     v-model="promo"
                     label="Add to promo"
                    ></v-switch>                
                </v-flex>
            </v-layout>
            <v-layout class="mb-3">
                <v-flex xs12>
                    <v-spacer></v-spacer>
                    <v-btn            
                            
                     class="success"
                     @click="createProduct"
                     :disabled="!valid || !price">
                     Create Product                        
                    </v-btn>
                </v-flex>
            </v-layout>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
    data(){
        return {
            title:'',
            vendor:'',
            color:'',
            material:'',
            price:0,
            description:'',
            promo: false,
            valid: false
        }
    },
    computed: {
        // loading () {
        //     return this.$store.getters.loading
        // }
    },
    methods: {
        createProduct() {
            if(this.$refs.form.validate()){
                const product = {
                    title: this.title,
                    vendor: this.vendor,
                    color: this.color,
                    material: this.material,
                    price: this.price,
                    description: this.description,
                    promo: this.promo
                }
                this.$store.dispatch('createProduct', product)
                .then(() => {
                    this.$router.push('/list')
                })
                .catch(() => {})
            }
        }
    }
}
</script>
