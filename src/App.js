import { useState } from 'react';

// The add function (string calculator)
function add(numbers) {
  // Step 1: Handle empty string
  if (numbers === '') return 0;

  // Step 2: Check for custom delimiters
  let delimiter = ',';
  let numbersString = numbers;

  if (numbers.startsWith('//')) {
    // Extract the custom delimiter
    const delimiterLine = numbers.split('\n')[0];
    // Remove the "//" and the brackets, if present, to get the delimiter
    const delimiterMatch = delimiterLine.match(/^\/\/\[(.*)\]\n/);
    if (delimiterMatch) {
      delimiter = delimiterMatch[1]; // Extract the delimiter
    } else {
      delimiter = delimiterLine.slice(2); // For single character delimiters like //;
    }
    numbersString = numbers.slice(delimiterLine.length + 1); // Remove the delimiter definition line
  }

  // Step 3: Handle newlines and replace custom delimiter with commas
  // This regular expression replaces all delimiters (custom or newlines) with commas
  numbersString = numbersString.replace(
    new RegExp(`[${delimiter}\n]`, 'g'),
    ','
  );

  // Step 4: Split numbers by commas
  const numArray = numbersString.split(',');

  // Step 5: Check for negative numbers
  const negatives = numArray.filter((num) => parseInt(num) < 0);
  if (negatives.length > 0) {
    throw new Error(`negatives not allowed ${negatives.join(', ')}`);
  }

  // Step 6: Ignore numbers greater than 1000
  const validNumbers = numArray.filter((num) => parseInt(num) <= 1000);

  // Step 7: Sum up valid numbers
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
