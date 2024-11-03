import { expect, test } from "vitest";
import { calculator } from "../../app/_models/recipe/calculator";
import { ingredients as baseIngredients } from "../../app/_models/carbonara/carbonara";
import { useCarbonaraCalculator } from "../../app/_models/carbonara/useCarbonaraCalculator";

test("Empty ingredients returns 0", () => {
  const result = calculator({}, {});
  expect(result).toBe(0);

  const result1 = calculator(baseIngredients, {});
  expect(result1).toBe(0);
});

test("Missing some ingredient returns 0", () => {
  const userIngredientsMissing = {
    bacon: 200,
    eggs: 1,
    milk: 200,
    butter: 500,
    oil: 100,
  };
  const result = calculator(baseIngredients, userIngredientsMissing);
  expect(result).toBe(0);
});

test("Unknown ingredient returns ok", () => {
  const userIngredientsWrong = {
    paprika: 200,
    pasta: 500,
    bacon: 200,
    eggs: 1,
    milk: 200,
    butter: 500,
    oil: 100,
  };
  const result = calculator(baseIngredients, userIngredientsWrong);
  expect(result).toBe(1);
});

test("Same list of ingredients returns 1", () => {
  const result = calculator(baseIngredients, structuredClone(baseIngredients));
  expect(result).toBe(1);
});

test("One ingredient amount is half the base amount, returns 0.5", () => {
  const userIngredients = {
    pasta: 250,
    bacon: 200,
    eggs: 1,
    milk: 200,
    butter: 500,
    oil: 100,
  };
  const result = calculator(baseIngredients, userIngredients);
  expect(result).toBe(0.5);
});

test("One ingredient amount is one third the base amount, returns 0.33", () => {
  const userIngredients = {
    pasta: 250,
    bacon: 200,
    eggs: 1,
    milk: 200,
    butter: 500,
    oil: 33,
  };
  const result = calculator(baseIngredients, userIngredients);
  expect(result).toBe(0);
});

test("One ingredient amount is one fifth the base amount, returns 0.2", () => {
  const userIngredients = {
    pasta: 250,
    bacon: 200,
    eggs: 1,
    milk: 200,
    butter: 100,
    oil: 33,
  };
  const result = calculator(baseIngredients, userIngredients);
  expect(result).toBe(0);
});

test("One ingredient amount is one tenth the base amount, returns 0.1", () => {
  const userIngredients = {
    pasta: 250,
    bacon: 200,
    eggs: 1,
    milk: 200,
    butter: 50,
    oil: 33,
  };
  const result = calculator(baseIngredients, userIngredients);
  expect(result).toBe(0);
});

test("With composable. One ingredient amount is one tenth the base amount, returns 0.1", () => {
  const userIngredients = {
    pasta: 250,
    bacon: 200,
    eggs: 1,
    milk: 200,
    butter: 50,
    oil: 33,
  };
  const { carbonaraCalculator } = useCarbonaraCalculator();
  const result = carbonaraCalculator(userIngredients);
  expect(result).toBe(0);
});

test("Double amount returns 2", () => {
  const doubleEntries = Object.entries(baseIngredients).map(([key, val]) => {
    return [key, val * 2];
  });
  const doubleBaseIngredients = Object.fromEntries(doubleEntries);
  const result = calculator(baseIngredients, doubleBaseIngredients);
  expect(result).toBe(2);
});

test("Triple amount returns 3", () => {
  const tripleEntries = Object.entries(baseIngredients).map(([key, val]) => {
    return [key, val * 3];
  });
  const doubleBaseIngredients = Object.fromEntries(tripleEntries);
  const result = calculator(baseIngredients, doubleBaseIngredients);
  expect(result).toBe(3);
});
