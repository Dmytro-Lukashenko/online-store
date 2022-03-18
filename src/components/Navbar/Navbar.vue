<template>
    <div>
        <v-navigation-drawer 
            app
            temporary
            v-model="sideNav"
        >
        <v-list>
      <v-list-item
      v-for="(link, i) in links"
      :key="i"
      :to="link.url"
      >
        <v-list-item-icon>
          <v-icon>
            {{ link.icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="link.title"></v-list-item-title>
        </v-list-item-content>       
      </v-list-item>
      <v-list-item 
       @click="onLogout"   
       v-if="isUserLoggedIn"
      >
        <v-list-item-icon>
          <v-icon>
            mdi-logout
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="'Logout'"></v-list-item-title>
        </v-list-item-content>       
      </v-list-item>
    </v-list>
        </v-navigation-drawer>        
        <v-toolbar dark  src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
            <v-app-bar-nav-icon 
            @click="sideNav = !sideNav"
            class="hidden-md-and-up"            
            />
            <v-toolbar-title>
                <router-link :to="'/'" tag="span" class="pointer">
                    Online Store
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn 
                    text 
                    v-for="(link, i) in links"
                    :key="i"      
                    :to="link.url"   
                    color="white"    
                    >
                    <v-icon left size="25px">{{ link.icon }}</v-icon>
                    {{link.title}}
                </v-btn>   
                <v-btn 
                    text                    
                    color="white"    
                    @click="onLogout"
                    v-if="isUserLoggedIn"
                    >
                    <v-icon left size="25px">mdi-logout</v-icon>
                    Logout
                </v-btn>        
            </v-toolbar-items>
        </v-toolbar>
        <v-main>            
            <router-view></router-view>
        </v-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sideNav: false,            
        }
    },
    methods: {
        onLogout () {
            this.$store.dispatch('logoutUser')            
        }
    },
    computed: {
        isUserLoggedIn() {
            return this.$store.getters.isUserLoggedIn
        },
        links () {
            if (this.isUserLoggedIn) {
                return [
                {
                    title:'Cart',
                    icon:'mdi-cart',
                    url:'/checkout'
                },
                {
                    title:'New Product',
                    icon:'mdi-plus',
                    url:'/new'
                },
                {
                    title:'My Products',
                    icon:'mdi-format-list-bulleted',
                    url:'/list'
                }
                ]
            }
            return [
                {
                    title:'Login',
                    icon:'mdi-account-box',
                    url:'/login'
                },
                 {
                    title:'Registry',
                    icon:'mdi-face-man',
                    url:'/registry'
                },
            ]
        }
    }

}
</script>

<style lang="scss" scoped>
@import './Navbar.scss'
</style>