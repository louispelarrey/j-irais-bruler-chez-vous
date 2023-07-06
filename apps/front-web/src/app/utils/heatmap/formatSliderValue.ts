export const formatSliderValue = (value: number): Date => {
  const date = new Date();
  date.setMonth(date.getMonth() - value);
  return date;
};
