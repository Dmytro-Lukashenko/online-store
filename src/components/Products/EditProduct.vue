<template>
  <v-dialog max-width="400" v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
         color="primary" 
         class="headline mr-3" 
         v-bind="attrs" 
         v-on="on"         
         >Edit</v-btn>
         </template>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex>
                        <v-card-title>
                            <h1 class="text-primary">Edit Product</h1>
                        </v-card-title>
                    </v-flex>
                </v-layout>                
                <v-layout row>
                    <v-flex>
                        <v-card-text>
                           <v-text-field                           
                            name="title"
                            label="Title"
                            type="text"
                            v-model="editedTitle"
                            >
                          </v-text-field>
                           <v-text-field                           
                            name="description"
                            label="Description"
                            type="text"
                            multiline
                            v-model="editedDescription"
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
                             @click="onCancel"
                             >Cancel</v-btn>
                            <v-btn 
                             dark 
                             color="light-blue darken-4"
                             @click="onSave"
                            >Save</v-btn>
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
            editedTitle: this.product.title,
            editedDescription: this.product.description
        }
    },
    methods: {
        onCancel() {
            this.editedTitle = this.product.title;
            this.editedDescription = this.product.description;
            this.dialog = false;
        },
        onSave() {
            if(this.editedTitle !== '' && this.editedDescription !== '')
            this.$store.dispatch('updateProduct', {
                title: this.editedTitle,
                description: this.editedDescription,
                id: this.product.id,
            })
            this.dialog = false;
        }
    }

}
</script>
