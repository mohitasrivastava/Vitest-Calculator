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

module.exports = add;
