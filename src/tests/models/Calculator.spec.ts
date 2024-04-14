import { Calculator, DataInput } from "../../models/Calculator";


describe("Test Calculator", () => {
  describe.only("Test calculate(DataInput)", () => {

    test.only("test data", () => {
      const calculator = new Calculator();
      const dataInput = new DataInput();
      dataInput.income = 0;

      let result = calculator.calculate(dataInput);
      expect(result.incomeTaxAnnual).toBe(0);

      dataInput.income = 18200;
      result = calculator.calculate(dataInput);

      expect(result.incomeTaxAnnual).toBe(0);

      dataInput.income = 18201;
      result = calculator.calculate(dataInput);
      expect(result.incomeTaxAnnual).toBe(0.16);
    });

  });
});
