/**
 * Generates a random integer between two given values.
 * 
 * @param {int} min minimum value
 * @param {int} max maximum value 
 * 
 * @returns the generated integer
 */
export function random(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }