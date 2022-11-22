<script setup lang="ts">
import ContactForm from "@/components/ContactForm.vue";
import SnackbarMessage from "@/components/SnackbarMessage.vue";
</script>

<template>
  <v-app>
    <v-main class="align-center d-flex">
      <ContactForm />
      <SnackbarMessage />
    </v-main>
  </v-app>
</template>
