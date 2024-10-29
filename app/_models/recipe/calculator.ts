export const calculator = (
  baseDataRaw: GenericIngredients,
  userData: GenericIngredients
) => {
  const baseData = structuredClone(baseDataRaw);
  if (!baseData || !Object.keys(baseData)?.length) return 0;
  if (!userData || !Object.keys(userData)?.length) return 0;
  const hasAllIngredients = Object.keys(baseData).every((baseKey) =>
    Object.keys(userData).includes(baseKey)
  );
  if (!hasAllIngredients) return 0;
  const results = Object.keys(baseData).map((key) => {
    const baseAmount = baseData[key] ?? 0;
    const userAmount = userData[key] ?? 0;
    const amount = userAmount / baseAmount;
    return Math.floor(amount * 2) / 2;
  });
  const minResult = Number(Math.min(...results));
  return isNaN(minResult) ? 0 : minResult;
};
