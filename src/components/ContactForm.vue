<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import type { IContactForm } from "@/interfaces/IContactForm";
import { useContactForm } from "@/stores/contactForm";
import {
  CONTACT_NAME_MAX_LENGTH,
  CONTACT_NAME_MIN_LENGTH,
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_SUBJECT_MAX_LENGTH,
} from "@/constants";
import { isRequired, minLength, maxLength, validEmail } from "@/rules";

const store = useContactForm();
const { sendMessage } = store;

const initialForm: IContactForm = {
  name: null,
  email: null,
  subject: null,
  message: null,
};

const contactForm = ref(null);
const isLoading: boolean = ref(false);
const isValid: boolean = ref(false);

const form: IContactForm = reactive({ ...initialForm });

const { name, email, subject, message } = toRefs(form);

function handleResetForm() {
  Object.assign(form, initialForm);
}

async function handleSubmit(payload) {
  await contactForm.value.validate();

  if (isValid.value) {
    isLoading.value = true;
    await sendMessage(payload);
    handleResetForm();
    isLoading.value = false;
  }
}
</script>

<template>
  <v-container>
    <v-card
      :loading="isLoading"
      :title="$t('ContactForm.Title')"
      :subtitle="$t('ContactForm.EnterContactData')"
    >
      <v-card-text>
        <v-form ref="contactForm" v-model="isValid">
          <v-container>
            <v-row>
              <v-col class="pl-md-0" cols="12" md="6">
                <v-text-field
                  id="cotanct-form-name"
                  v-model="name"
                  class="mb-2"
                  :rules="[
                    isRequired,
                    minLength(CONTACT_NAME_MIN_LENGTH),
                    maxLength(CONTACT_NAME_MAX_LENGTH),
                  ]"
                  :counter="CONTACT_NAME_MAX_LENGTH"
                  variant="outlined"
                  :label="$t('ContactForm.Name')"
                  required
                ></v-text-field>
                <v-text-field
                  id="cotanct-form-email"
                  v-model="email"
                  class="mb-2"
                  :rules="[isRequired, validEmail]"
                  variant="outlined"
                  :label="$t('ContactForm.Email')"
                  required
                ></v-text-field>
                <v-text-field
                  id="cotanct-form-subject"
                  v-model="subject"
                  :rules="[maxLength(CONTACT_SUBJECT_MAX_LENGTH)]"
                  :counter="CONTACT_SUBJECT_MAX_LENGTH"
                  variant="outlined"
                  :label="$t('ContactForm.Subject')"
                ></v-text-field>
              </v-col>
              <v-col class="pr-md-0" cols="12" md="6">
                <v-textarea
                  id="cotanct-form-message"
                  v-model="message"
                  :label="$t('ContactForm.Message')"
                  class="contact-form__textarea"
                  rows="8"
                  :counter="CONTACT_MESSAGE_MAX_LENGTH"
                  :rules="[isRequired, maxLength(CONTACT_MESSAGE_MAX_LENGTH)]"
                  variant="outlined"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-btn
                block
                size="large"
                variant="flat"
                :disabled="isLoading"
                @click.prevent="handleResetForm()"
                >{{ $t("ContactForm.ResetForm") }}</v-btn
              >
            </v-col>
            <v-col cols="12" md="6">
              <v-btn
                id="contact-submit"
                block
                size="large"
                color="green"
                variant="flat"
                :disabled="isLoading"
                :loading="isLoading"
                @click.prevent="handleSubmit(form)"
                >{{ $t("ContactForm.Submit") }}</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
