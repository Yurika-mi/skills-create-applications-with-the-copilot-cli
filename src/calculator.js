#!/usr/bin/env node

// Supported operations:
// - addition (+)
// - subtraction (-)
// - multiplication (* or x)
// - division (/)
// - modulo (%)
// - power (^)
// - square root (sqrt)

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

function modulo(a, b) {
  if (b === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(n);
}

const operations = {
  addition: { handler: addition, arity: 2 },
  add: { handler: addition, arity: 2 },
  "+": { handler: addition, arity: 2 },
  subtraction: { handler: subtraction, arity: 2 },
  subtract: { handler: subtraction, arity: 2 },
  "-": { handler: subtraction, arity: 2 },
  multiplication: { handler: multiplication, arity: 2 },
  multiply: { handler: multiplication, arity: 2 },
  "*": { handler: multiplication, arity: 2 },
  x: { handler: multiplication, arity: 2 },
  division: { handler: division, arity: 2 },
  divide: { handler: division, arity: 2 },
  "/": { handler: division, arity: 2 },
  modulo: { handler: modulo, arity: 2 },
  "%": { handler: modulo, arity: 2 },
  power: { handler: power, arity: 2 },
  exponentiation: { handler: power, arity: 2 },
  "^": { handler: power, arity: 2 },
  squareroot: { handler: squareRoot, arity: 1 },
  "square-root": { handler: squareRoot, arity: 1 },
  sqrt: { handler: squareRoot, arity: 1 },
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

  if (!operationName) {
    throw new Error(
      "Usage: node src/calculator.js <operation> <number1> [number2]\n" +
        "Supported operations: addition (+), subtraction (-), multiplication (*), division (/), modulo (%), power (^), square root (sqrt)"
    );
  }

  const operation = operations[operationName.toLowerCase()] || operations[operationName];

  if (!operation) {
    throw new Error(`Unsupported operation: ${operationName}`);
  }

  if (leftOperand === undefined || (operation.arity === 2 && rightOperand === undefined)) {
    throw new Error(
      "Usage: node src/calculator.js <operation> <number1> [number2]\n" +
        "Supported operations: addition (+), subtraction (-), multiplication (*), division (/), modulo (%), power (^), square root (sqrt)"
    );
  }

  const a = parseNumber(leftOperand, "first number");

  if (operation.arity === 1) {
    return operation.handler(a);
  }

  const b = parseNumber(rightOperand, "second number");

  return operation.handler(a, b);
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
  modulo,
  power,
  squareRoot,
  runCli,
};
