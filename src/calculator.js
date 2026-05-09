#!/usr/bin/env node

// Supported operations:
// - addition (+)
// - subtraction (-)
// - multiplication (* or x)
// - division (/)

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return a / b;
}

const operations = {
  addition,
  add: addition,
  "+": addition,
  subtraction,
  subtract: subtraction,
  "-": subtraction,
  multiplication,
  multiply: multiplication,
  "*": multiplication,
  x: multiplication,
  division,
  divide: division,
  "/": division,
};

function parseNumber(value, label) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid ${label}: ${value}`);
  }

  return parsedValue;
}

function runCli(argv) {
  const [operationName, leftOperand, rightOperand] = argv;

  if (!operationName || leftOperand === undefined || rightOperand === undefined) {
    throw new Error(
      "Usage: node src/calculator.js <operation> <number1> <number2>\n" +
        "Supported operations: addition (+), subtraction (-), multiplication (*), division (/)"
    );
  }

  const operation = operations[operationName.toLowerCase()] || operations[operationName];

  if (!operation) {
    throw new Error(`Unsupported operation: ${operationName}`);
  }

  const a = parseNumber(leftOperand, "first number");
  const b = parseNumber(rightOperand, "second number");

  return operation(a, b);
}

if (require.main === module) {
  try {
    const result = runCli(process.argv.slice(2));
    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  runCli,
};
