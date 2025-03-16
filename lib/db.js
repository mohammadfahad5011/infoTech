import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data.json");

console.log(filePath);

// Explanation:

// path.join()
// path.join() is a method from Node.js's built-in path module.
// It joins path segments into a single path string, ensuring correct formatting across different operating systems.

// process.cwd()
// process.cwd() returns the current working directory of the Node.js process.
// This is the directory from which the script is being run.
// "data.json"
// This is the name of the file we want to access.

// Function to read data from JSON file
export const readData = () => {
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
};

// Function to write data to JSON file
export const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// JSON.stringify(data, null, 2)
// Converts the data object into a JSON string.
// null means no custom transformation is applied.
// 2 is the number of spaces used for indentation (for better readability).
