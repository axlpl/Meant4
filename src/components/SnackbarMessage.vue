<script setup lang="ts">
import { ref, computed } from "vue";
import { SNACKBAR_TIME } from "@/constants";
import { useSnackbar } from "@/stores/snackbar";

const store = useSnackbar();
const snackbar = ref(!!store.lastMessage);

function closeSnackbar() {
  snackbar.value = false;
}

function openSnackbar() {
  snackbar.value = true;
}

const lastMessage = computed(() => {
  const info = store.lastMessage;
  if (info) openSnackbar();
  return info;
});
</script>

<template>
  <v-snackbar
    v-model="snackbar"
    :message="lastMessage"
    :timeout="SNACKBAR_TIME"
  >
    {{ lastMessage }}

    <template #actions>
      <v-btn color="blue" variant="text" @click.prevent="closeSnackbar()">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
