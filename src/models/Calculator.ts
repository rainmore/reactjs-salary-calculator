import { Income, IncomeConvert, Period } from "./Income";
import { Super } from "./Super";
import { TaxThreshold, TaxThresholds } from "./TaxThresholds";

export class DataInput {

  income: number = 120000;
  period: Period = Period.Annually;

  includeSuper: boolean = false;
  superPercentage: number = new Super().getRateByYear(new Date().getFullYear()) * 100;

  taxYear: number = new Date().getFullYear();
  numberOfHoliday: number = 20;
  isContractRole: boolean = false;
  includeMedicareLevy: boolean = true;
}

export class Result {
  input: DataInput;

  constructor(input: DataInput) {
    this.input = input;
  }

  afterTaxIncome: number = 0;

  tax: number = 0;

  incomeThresholds: TaxThreshold[] = [];
  highestThreshold?: TaxThreshold;

  getIncome(): Income {
    const income = new Income(this.input.income, this.input.period);
    income.includeSuper = this.input.includeSuper;
    income.superPercentage = this.input.superPercentage;
    return income;
  }
}

export class Calculator {
  private _taxThresholds: TaxThresholds = new TaxThresholds();

  private _converter = new IncomeConvert();

  private getIncomeWithoutSuper(income: Income): Income {
    if (!income.includeSuper) return income;
    let amount = 0;

    if (income.superPercentage > 0) {
      amount = income.amount / (1 + income.superPercentage);
    }

    const newIncome = new Income(amount, income.period);
    newIncome.superPercentage = income.superPercentage;

    return newIncome;
  }

  calculate(dataInput: DataInput): Result {
    const result = new Result(dataInput);
    const income = result.getIncome();
    const incomeWithoutSuper = this._converter.convert(this.getIncomeWithoutSuper(income), Period.Annually);

    result.incomeThresholds = this._taxThresholds.getByYear(dataInput.taxYear);

    result.highestThreshold = result.incomeThresholds.find(
      (taxThreshold) => 
        incomeWithoutSuper.amount >= taxThreshold.min && 
        taxThreshold.max && incomeWithoutSuper.amount <= taxThreshold.max!
    )!;

    result.tax = Math.abs((result.highestThreshold.base + (incomeWithoutSuper.amount - 
      result.highestThreshold.min - 1) * result.highestThreshold.rate));

    result.afterTaxIncome = incomeWithoutSuper.amount - result.tax;

    // TODO to calculate the medicare levi

    return result;
  }
}
