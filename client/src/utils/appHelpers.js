/**
 * Copies an array of objects by value
 * @param  {array{}} original An array of objects
 * @return {array{}}          A copy of the array
 */
export const deepCloneArrayOfObjects = (original) => {
  return JSON.parse(JSON.stringify(original));
}
