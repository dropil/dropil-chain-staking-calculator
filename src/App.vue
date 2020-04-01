<template>
  <div id="app">
    <div class="app-main page">
      <div class="main">
        <Header />
        <transition name="animation-fade-fast" mode="out-in">
          <router-view />
        </transition>
      </div>

      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header"
import Footer from "./components/Footer"

export default {
  name: 'App',
  components: { Header, Footer },
  computed: {    
    includeHeader() {      
      return this.pageClass !== "no-header";
    }
  },
  beforeCreate() {    
    if (process.env.NODE_ENV === 'development') {
      require('./assets/sass/main.scss')      
      document.getElementById('light-theme').remove()
    }
  }  
}
</script>