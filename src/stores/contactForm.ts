import { defineStore } from "pinia";
import { mande } from "mande";
import type { IContactForm } from "@/interfaces/IContactForm";
import { API_MESSAGE } from "@/api";
import { useSnackbar } from "./snackbar";
import i18n from "@/plugins/i18n";

const { t } = i18n.global;

const api = mande(API_MESSAGE);

export const useContactForm = defineStore("contactForm", {
  actions: {
    async sendMessage(payload: IContactForm) {
      const snackbar = useSnackbar();

      try {
        await api.post(payload);
        snackbar.changeMessage(t("ContactForm.Success"));
      } catch (error) {
        snackbar.changeMessage(t("ContactForm.Failed"));
      }
    },
  },
});
