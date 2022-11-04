export const useTimeConvert = (num: number) => {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  return `${hours} hrs ${minutes} mins`;
};
