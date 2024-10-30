// @vitest-environment nuxt
import { shallowMount } from "@vue/test-utils";
import { describe, test, expect, beforeEach } from "vitest";
import CarbonaraForm from "../../app/_models/carbonara/CarbonaraForm.vue";
import { ingredients } from "../../app/_models/carbonara/carbonara";

describe("CarbonaraForm component", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallowMount(CarbonaraForm);
    wrapper.vm.userIngredients = {};
  });

  test("One form-control for each ingredient", () => {
    const formControls = wrapper.findAll(".form-control");
    expect(formControls).toHaveLength(Object.keys(ingredients).length);
  });

  test("Change input mode, switch between inputs and selects", async () => {
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("select").exists()).toBe(false);

    await wrapper
      .find("span[data-test-id='change-input-mode']")
      .trigger("click");

    expect(wrapper.find("input").exists()).toBe(false);
    expect(wrapper.find("select").exists()).toBe(true);
  });

  test("Click in calculate emits change event, and every input is erroneous", async () => {
    await wrapper
      .find("button[data-test-id='button-calculate-recipe']")
      .trigger("click");
    expect(wrapper.emitted("change")).toBeTruthy();
    expect(wrapper.emitted("change")[0]).toEqual([wrapper.vm.userIngredients]);
    expect(wrapper.find("input.input-error").exists()).toBe(true);
    const formControls = wrapper.findAll("input.input-error");
    expect(formControls).toHaveLength(Object.keys(ingredients).length);
  });

  test("Change amount for first ingredient adds/subtract the correct amount", async () => {
    const index = 0;
    const key = Object.keys(ingredients)[index] as string;
    const initialAmount = wrapper.vm.userIngredients[key] ?? 0;
    const addAmount = wrapper.vm.getAmountToAdd(key);

    // ADD.Simular el click del componente Icon
    await wrapper.vm.addAmount(key);
    const newAmount = wrapper.vm.userIngredients[key];
    expect(newAmount).toBe(initialAmount + addAmount);
    // ADD
    await wrapper.vm.addAmount(key);
    const newAmount2 = wrapper.vm.userIngredients[key];
    expect(newAmount2).toBe(initialAmount + addAmount + addAmount);
    // SUBTRACT
    await wrapper.vm.subtractAmount(key);
    const newAmount3 = wrapper.vm.userIngredients[key];
    expect(newAmount3).toBe(initialAmount + addAmount);
  });

  test("Add amount in every input, and every input gets input-success-class", async () => {
    Object.keys(ingredients).forEach(async (key) => {
      await wrapper.vm.addAmount(key);
    });
    await wrapper.vm.$nextTick();
    await wrapper
      .find("button[data-test-id='button-calculate-recipe']")
      .trigger("click");
    const formControls = wrapper.findAll("input.input-success");
    expect(formControls).toHaveLength(Object.keys(ingredients).length);
  });

  test("Change input value and check error/success classes", async () => {
    const index = 0;
    const key = Object.keys(ingredients)[index] as string;
    const formControls = wrapper.findAll("input");
    const inputElm = formControls.at(index);

    await inputElm.setValue(null);
    await wrapper
      .find("button[data-test-id='button-calculate-recipe']")
      .trigger("click");
    expect(inputElm.classes()).toContain("input-error");

    await inputElm.setValue(100);
    await wrapper
      .find("button[data-test-id='button-calculate-recipe']")
      .trigger("click");
    expect(inputElm.classes()).toContain("input-success");
  });

  test("Slot content is-disabled when ingredients have changed", async () => {
    wrapper.vm.userIngredients.pasta = 300;
    await wrapper.vm.$nextTick();

    const slotElm = wrapper.find(".is-disabled");
    expect(slotElm.exists()).toBe(true);
  });
});
