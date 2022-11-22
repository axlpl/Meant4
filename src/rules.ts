import i18n from "./plugins/i18n";

const { t } = i18n.global;

export const isRequired = (value: string) => !!value || t("Rules.isRequired");

export const minLength = (size: number) => {
  return (value: string) =>
    (!!value && value.length >= size) || t("Rules.MinLength", { size });
};

export const maxLength = (size: number) => {
  return (value: string) =>
    !value || value.length <= size || t("Rules.MaxLength", { size });
};

export const validEmail = (value: string) =>
  (value && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) ||
  t("Rules.Email");
