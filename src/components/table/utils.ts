export const isMatch = (text, searchValue) => {
  if (!text || !searchValue) return false;
  return text.toLowerCase().includes(searchValue.toLowerCase());
};
