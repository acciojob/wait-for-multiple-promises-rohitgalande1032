
let output = document.getElementById("output");
output.innerHTML = `
  <tr id="loading">
    <td colspan="2">Loading...</td>
  </tr> 
`;

// Function to create a promise with a random delay
function createPromise(id, min = 1, max = 3) {
  const delay = Math.random() * (max - min) + min; // Random delay between min and max seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, time: delay.toFixed(3) });
    }, delay * 1000); // Convert seconds to milliseconds
  });
}

// Create 3 promises
let promise1 = createPromise("Promise 1");
let promise2 = createPromise("Promise 2");
let promise3 = createPromise("Promise 3");

const startTime = performance.now();

// Wait for all promises to resolve
Promise.all([promise1, promise2, promise3]).then((results) => {
  const endTime = performance.now();
  const totalTime = ((endTime - startTime) / 1000).toFixed(3); // Total time in seconds

  // Remove the "Loading..." row
  output.innerHTML = "";

  // Populate table with individual promise results
  results.forEach(({ id, time }) => {
    output.innerHTML += `
      <tr>
        <td>${id}</td>
        <td>${time} seconds</td>
      </tr>
    `;
  });

  // Add the total row
  output.innerHTML += `
    <tr>
      <td>Total</td>
      <td>${totalTime} seconds</td>
    </tr>
  `;
});
