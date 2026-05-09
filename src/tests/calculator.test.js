const {
  addition,
  subtraction,
  multiplication,
  division,
  runCli,
} = require("../calculator");

describe("calculator operations", () => {
  describe("addition", () => {
    test("adds the values from the example image", () => {
      expect(addition(2, 3)).toBe(5);
    });

    test("adds negative and decimal numbers", () => {
      expect(addition(-2, 5.5)).toBe(3.5);
    });
  });

  describe("subtraction", () => {
    test("subtracts the values from the example image", () => {
      expect(subtraction(10, 4)).toBe(6);
    });

    test("subtracts to a negative result", () => {
      expect(subtraction(3, 8)).toBe(-5);
    });
  });

  describe("multiplication", () => {
    test("multiplies the values from the example image", () => {
      expect(multiplication(45, 2)).toBe(90);
    });

    test("multiplies by zero", () => {
      expect(multiplication(12, 0)).toBe(0);
    });
  });

  describe("division", () => {
    test("divides the values from the example image", () => {
      expect(division(20, 5)).toBe(4);
    });

    test("returns decimal results", () => {
      expect(division(7, 2)).toBe(3.5);
    });

    test("throws on division by zero", () => {
      expect(() => division(10, 0)).toThrow("Division by zero is not allowed.");
    });
  });

  describe("runCli", () => {
    test("supports symbolic operations", () => {
      expect(runCli(["+", "2", "3"])).toBe(5);
      expect(runCli(["-", "10", "4"])).toBe(6);
      expect(runCli(["*", "45", "2"])).toBe(90);
      expect(runCli(["/", "20", "5"])).toBe(4);
    });

    test("supports named operations", () => {
      expect(runCli(["addition", "1", "2"])).toBe(3);
      expect(runCli(["subtraction", "9", "4"])).toBe(5);
      expect(runCli(["multiplication", "6", "3"])).toBe(18);
      expect(runCli(["division", "8", "2"])).toBe(4);
    });

    test("throws for unsupported operations", () => {
      expect(() => runCli(["modulo", "8", "2"])).toThrow(
        "Unsupported operation: modulo"
      );
    });

    test("throws for invalid numbers", () => {
      expect(() => runCli(["+", "abc", "2"])).toThrow("Invalid first number: abc");
    });

    test("throws for missing arguments", () => {
      expect(() => runCli(["+"])).toThrow(
        "Usage: node src/calculator.js <operation> <number1> <number2>"
      );
    });
  });
});
