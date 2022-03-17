<template>
  <v-dialog max-width="400" v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
         dark
         color="light-blue darken-4"         
         v-bind="attrs" 
         v-on="on"         
         >Buy</v-btn>
         </template>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex>
                        <v-card-title>
                            <h2 class="text-primary">Do you want to buy it?</h2>
                        </v-card-title>
                    </v-flex>
                </v-layout>                
                <v-layout row>
                    <v-flex>
                        <v-card-text>
                           <v-text-field                           
                            name="name"
                            label="Name"
                            type="text"
                            v-model="name"
                            >
                          </v-text-field>
                           <v-text-field                           
                            name="phone"
                            label="Phone"
                            type="text"                            
                            v-model="phone"
                            >
                          </v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>                
                <v-layout row>
                    <v-flex>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn 
                             dark 
                             color="light-blue darken-4" 
                             outlined
                             @click="onClose"
                             :disabled="localLoading"
                             >Close</v-btn>
                            <v-btn 
                             dark 
                             color="light-blue darken-4"
                             @click="onBuy"
                             :disabled ="localLoading"
                             :loading ="localLoading"
                            >Buy It</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>      
  </v-dialog>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            dialog:false,
            name: '',
            phone: '',
            localLoading: false
        }
    },
    methods: {
        onClose() {
            this.name='';
            this.phone='';
            this.dialog = false;
        },
        onBuy() {
            if(this.name !== '' && this.phone !== ''){
            this.$store.dispatch('createOrder', {
                name: this.name,
                phone: this.phone,
                productId: this.product.id,
                ownerId: this.product.ownerId
            }).finally(() => {
                this.name = ""
                this.phone = ""
                this.localLoading = false
                this.dialog = false
            })          
        }
    }  
    }

}
</script>
