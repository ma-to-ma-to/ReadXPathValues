// this module is for any useful common functions
// checks for null value or empty string
const isEmpty = (str) => {
  return !str || str.length === 0;
}

export { isEmpty };
