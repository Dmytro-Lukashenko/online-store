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
            <v-layout row class="mb-3">
                <v-flex xs12>
                    <v-btn class="warning" @click="upload">
                        Upload
                        <v-icon right dark size="25px">mdi-cloud-upload</v-icon>
                    </v-btn>

                    <input 
                     ref="fileInput" 
                     type="file" 
                     style="display:none;" 
                     accept="image/*"
                     @change="onFileChange">

                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12>
                    <img
                     v-if="imageSrc"
                     :src="imageSrc"
                     height = "200px"                     
                    >                    
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12>
                   <v-switch
                    color="primary"
                     v-model="promo"
                     label="Add to promo"
                    ></v-switch>                
                </v-flex>
            </v-layout>
            <v-layout row class="mb-3">
                <v-flex xs12>
                    <v-spacer></v-spacer>
                    <v-btn   
                     :loading="loading"
                     class="success"
                     @click="createProduct"
                     :disabled="!valid || !price || !image || loading">
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
            valid: false,
            image: null,
            imageSrc: '',
        }
    },
    computed: {
        loading () {
            return this.$store.getters.loading
        }
    },
    methods: {
        createProduct() {
            if(this.$refs.form.validate() && this.image){
                const product = {
                    title: this.title,
                    vendor: this.vendor,
                    color: this.color,
                    material: this.material,
                    price: this.price,
                    description: this.description,
                    promo: this.promo,
                    image: this.image
                }
                this.$store.dispatch('createProduct', product)
                .then(() => {
                    this.$router.push('/list')
                })
                .catch(() => {})
            }
        },
        upload () {
            this.$refs.fileInput.click()
        },
        onFileChange (event) {
            
            const file = event.target.files[0]
            
            const reader = new FileReader()
                     
            reader.onload = e => {                
                this.imageSrc = reader.result                              
            }              
            reader.readAsDataURL(file); 
            this.image = file          
        }
    }
}
</script>
