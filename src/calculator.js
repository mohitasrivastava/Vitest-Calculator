function add(numbers) {
  // Step 1: Handle the case where the input string is empty.
  // If the input string is empty, return 0 because there's nothing to sum.
  if (numbers === '') {
    return 0;
  }

  // Step 2: Initialize default delimiter and prepare to handle the string of numbers.
  let delimiter = ','; // Default delimiter is a comma (',').
  let numbersString = numbers; // The string of numbers will be modified as we process it.

  // Step 3: Check if the input string contains a custom delimiter.
  // If the string starts with "//", it indicates a custom delimiter definition.
  if (numbers.startsWith('//')) {
    // Extract the delimiter definition, which is on the first line before a newline.
    const delimiterLine = numbers.split('\n')[0];

    // Check if the delimiter is enclosed in square brackets, e.g., "//[***]"
    const delimiterMatch = delimiterLine.match(/^\/\/\[(.*)\]\n/);
    if (delimiterMatch) {
      // If the delimiter is enclosed in square brackets, extract it (e.g., "***").
      delimiter = delimiterMatch[1]; // Extract the custom delimiter inside the square brackets.
    } else {
      // If the delimiter is a single character (e.g., "//;"), extract it directly.
      delimiter = delimiterLine.slice(2); // The delimiter is everything after "//".
    }

    // After identifying the custom delimiter, remove the delimiter definition part from the numbers string.
    // Slice the input string to remove the delimiter definition line and the following newline.
    numbersString = numbers.slice(delimiterLine.length + 1);
  }

  // Step 4: Replace all occurrences of the delimiter (or newlines) with commas for easier processing.
  // This ensures that both custom delimiters and newline characters are treated as commas.
  numbersString = numbersString.replace(
    new RegExp(`[${delimiter}\n]`, 'g'), // Replace all custom delimiters and newlines with commas.
    ','
  );

  // Step 5: Split the string of numbers into an array of individual number strings.
  const numArray = numbersString.split(','); // Use the comma to separate the numbers.

  // Step 6: Check for negative numbers in the array.
  // Filter the array to find any numbers that are negative.
  const negatives = numArray.filter((num) => parseInt(num) < 0);

  if (negatives.length > 0) {
    // If there are any negative numbers, throw an error and display them.
    throw new Error(`negatives not allowed ${negatives.join(', ')}`);
  }

  // Step 7: Filter out numbers greater than 1000, as they are ignored.
  const validNumbers = numArray.filter((num) => parseInt(num) <= 1000);
  // This step ensures that any number greater than 1000 is excluded from the summing process.

  // Step 8: Sum up the valid numbers.
  // Reduce the array by adding each valid number together.
  return validNumbers.reduce((sum, num) => sum + parseInt(num), 0);
}

// Export the function so it can be used in other modules.
module.exports = add;
