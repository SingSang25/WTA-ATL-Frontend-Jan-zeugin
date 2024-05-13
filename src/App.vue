<script setup>
import { RouterView } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import HeaderVue from '@/components/Header.vue'
import FooterVue from '@/components/Footer.vue'
import AlertComponent from '@/components/Alert.vue'
import SelectColor from '@/components/SelectColor.vue'

</script>

<template>
  <header>
    <HeaderVue />
  </header>

  <main class="container mt-5">
    <alert-component />
    <router-view />
    <SelectColor />
  </main>

  <footer>
    <FooterVue />
  </footer>
</template>