const express = require("express");
const app = express();
const PORT = 3000;

// Route to find prime numbers less than 100
app.get("/find_prime_100", (req, res) => {
  const primes = findPrimes(100);
  res.json({ primes });
});

// Route to find cubes less than 100
app.get("/find_cube_100", (req, res) => {
  const cubes = findCubes(100);
  res.json({ cubes });
});

// Function to find prime numbers less than n
function findPrimes(n) {
  const primes = [];
  for (let i = 2; i < n; i++) {
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
  }
  return primes;
}

// Function to find cubes less than n
function findCubes(n) {
  const cubes = [];
  for (let i = 1; i < n; i++) {
    const cube = i * i * i;
    if (cube < n) {
      cubes.push(cube);
    } else {
      break;
    }
  }
  return cubes;
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
