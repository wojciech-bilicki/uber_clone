export const debounce = (
  callback: (searchTerm: string) => void,
  delay: number
) => {
  let timer: number | undefined;
  return (searchTerm: string) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => callback(searchTerm), delay);
  };
};
