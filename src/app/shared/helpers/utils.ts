export const enumToArray = (enumValue: any) => {
  return Object.entries(enumValue)
    .filter((item) => !isNaN(item[0] as any))
    .map((item) => item[1]);
};
