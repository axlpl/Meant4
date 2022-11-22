import { describe, it, expect, beforeEach } from "vitest";
import { createVuetify } from "vuetify";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";

import i18n from "@/plugins/i18n";
import ContactForm from "../ContactForm.vue";

describe("ContactForm", () => {
  let vuetify;
  let wrapper: any;

  beforeEach(() => {
    vuetify = createVuetify();

    wrapper = mount(ContactForm, {
      global: {
        plugins: [vuetify, i18n, createTestingPinia()],
      },
    });

    const name = "Test mailer";
    const email = "test@email.com";
    const subject = "Subject";
    const message = "Test message message message";

    wrapper.find("#cotanct-form-name").setValue(name);
    wrapper.find("#cotanct-form-email").setValue(email);
    wrapper.find("#cotanct-form-subject").setValue(subject);
    wrapper.find("#cotanct-form-message").setValue(message);
  });

  it("Test: form should be false", async () => {
    wrapper.vm.handleResetForm();
    await wrapper.vm.contactForm.validate();
    expect(wrapper.vm.isValid).toBeFalsy();
  });

  it("Test: form should be true", async () => {
    await wrapper.vm.contactForm.validate();
    expect(wrapper.vm.isValid).toBeTruthy();
  });

  it("Test: reset form", () => {
    wrapper.vm.handleResetForm();

    expect(wrapper.vm.form.name).toEqual(null);
    expect(wrapper.vm.form.email).toEqual(null);
    expect(wrapper.vm.form.subject).toEqual(null);
    expect(wrapper.vm.form.message).toEqual(null);
  });

  it("Test: field name validation", async () => {
    wrapper.find("#cotanct-form-name").setValue("");

    await wrapper.vm.contactForm.validate();
    expect(wrapper.vm.isValid).toBeFalsy();

    wrapper.find("#cotanct-form-name").setValue("A");

    await wrapper.vm.contactForm.validate();
    expect(wrapper.vm.isValid).toBeFalsy();

    wrapper
      .find("#cotanct-form-name")
      .setValue("Very long name Very long name Very long name Very long name");

    await wrapper.vm.contactForm.validate();
    expect(wrapper.vm.isValid).toBeFalsy();
  });

  it("Test: field email validation", async () => {
    wrapper.find("#cotanct-form-email").setValue("");

    await wrapper.vm.contactForm.validate();
    expect(wrapper.vm.isValid).toBeFalsy();

    wrapper.find("#cotanct-form-email").setValue("email");

    await wrapper.vm.contactForm.validate();
    expect(wrapper.vm.isValid).toBeFalsy();
  });

  it("Test: field subject validation", async () => {
    wrapper.find("#cotanct-form-subject").setValue("");

    await wrapper.vm.contactForm.validate();
    expect(wrapper.vm.isValid).toBeTruthy();
  });

  it("Test: field message validation", async () => {
    wrapper.find("#cotanct-form-message").setValue("");

    await wrapper.vm.contactForm.validate();
    expect(wrapper.vm.isValid).toBeFalsy();

    wrapper
      .find("#cotanct-form-message")
      .setValue(
        "very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... very long message... "
      );

    await wrapper.vm.contactForm.validate();
    expect(wrapper.vm.isValid).toBeFalsy();
  });
});
