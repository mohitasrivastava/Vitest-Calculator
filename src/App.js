import { useState } from 'react';

// The add function (string calculator)
function add(numbers) {
  // Step 1: Handle the case where the input string is empty.
  if (numbers === '') {
    return 0;
  }

  // Step 2: Initialize default delimiter and prepare to handle the string of numbers.
  let delimiter = ','; // Default delimiter is a comma (',').
  let numbersString = numbers;

  // Step 3: Check if the input string contains a custom delimiter.
  if (numbers.startsWith('//')) {
    // Extract the delimiter definition, which is on the first line before a newline.
    const delimiterLine = numbers.split('\n')[0];

    // Check if the delimiter is enclosed in square brackets, e.g., "//[***]"
    const delimiterMatch = delimiterLine.match(/^\/\/\[(.*?)\]\n/);
    if (delimiterMatch) {
      // If the delimiter is enclosed in square brackets, extract it (e.g., "***").
      delimiter = delimiterMatch[1]; // Extract the custom delimiter inside the square brackets.
    } else {
      // If the delimiter is a single character (e.g., "//;"), extract it directly.
      delimiter = delimiterLine.slice(2); // The delimiter is everything after "//".
    }

    // After identifying the custom delimiter, remove the delimiter definition part from the numbers string.
    numbersString = numbers.slice(delimiterLine.length + 1);
  }

  // Step 4: Replace all occurrences of the delimiter (or newlines) with commas for easier processing.
  // Escape the delimiter for use in a regular expression.
  const escapedDelimiter = delimiter.replace(
    /[-[\]{}()*+?.,\\^$|#\s]/g,
    '\\$&'
  ); // Escape special characters in delimiter.
  const regex = new RegExp(`[${escapedDelimiter}\n]`, 'g'); // Create a regex for the custom delimiter.

  numbersString = numbersString.replace(regex, ','); // Replace the delimiter (and newlines) with commas.

  // Step 5: Split the string of numbers into an array of individual number strings.
  const numArray = numbersString.split(','); // Use the comma to separate the numbers.

  // Step 6: Check for negative numbers in the array.
  const negatives = numArray.filter((num) => parseInt(num) < 0);
  if (negatives.length > 0) {
    // If there are any negative numbers, throw an error and display them.
    throw new Error(`negatives not allowed ${negatives.join(', ')}`);
  }

  // Step 7: Filter out numbers greater than 1000, as they are ignored.
  const validNumbers = numArray.filter((num) => parseInt(num) <= 1000);

  // Step 8: Sum up the valid numbers.
  return validNumbers.reduce((sum, num) => sum + parseInt(num), 0);
}

// module.exports = add;

function App() {
  // State to manage input and result
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle form submit (button click)
  const handleCalculate = () => {
    try {
      // Call the add function with the input and update the result
      const sum = add(input);
      setResult(sum);
      setError(null); // Reset error if calculation is successful
    } catch (err) {
      // Set the error message if any exception occurs (like negative numbers)
      setError(err.message);
      setResult(null); // Clear previous result in case of an error
    }
  };

  return (
    <div className="App">
      <h1>String Calculator</h1>

      <div>
        <label>
          Enter numbers (comma or dash separated):
          <br />
          <textarea
            rows="4"
            cols="50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
      </div>

      <div>
        <button onClick={handleCalculate}>Calculate</button>
      </div>

      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}{' '}
        {/* Display error if any */}
        {result !== null && !error && <p>Result: {result}</p>}{' '}
        {/* Display result if calculated */}
      </div>
    </div>
  );
}

export default App;
