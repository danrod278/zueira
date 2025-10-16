function randFloatDecimals(min, max, decimals) {
  const factor = 10 ** decimals;
  const r = Math.random() * (max - min) + min;
  return Math.round(r * factor) / factor;
}

console.log(randFloatDecimals(-23.5, -23, 4)); // ex: 2.718
console.log(randFloatDecimals(-46.5, -46, 4)); // ex: 0.1234