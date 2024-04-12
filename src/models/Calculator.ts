import { Income, IncomeConvert, Period } from "./Income";
import { Super } from "./Super";
import { TaxThreshold, TaxThresholds } from "./TaxThresholds";


const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_SUPER_RATE = new Super().getRateByYear(CURRENT_YEAR);

export class DataInput {

  income: number = 120000;
  period: Period = Period.Annually;

  includeSuper: boolean = false;
  superPercentage: number = CURRENT_SUPER_RATE;

  taxYear: number = CURRENT_YEAR;
  numberOfHoliday: number = 20;
  isContractRole: boolean = false;
  includeMedicareLevy: boolean = true;
}

export class Result {
  input: DataInput;

  constructor(input: DataInput) {
    this.input = input;
  }

  beforeAnnualTaxIncome: number = 0;
  afterAnnualTaxIncome: number = 0;

  taxAnnual: number = 0;

  incomeThresholds: TaxThreshold[] = [];
  highestThreshold?: TaxThreshold;

  superAnnual: number = 0;
}

export class Calculator {
  private _taxThresholds: TaxThresholds = new TaxThresholds();

  private _converter = new IncomeConvert();

  private getIncomeWithoutSuper(income: Income): Income {
    if (!income.includeSuper) return income;
    let amount = 0;

    if (income.superPercentage > 0) {
      amount = (1 - income.superPercentage) * income.amount;
    }

    const newIncome = new Income(amount, income.period);
    newIncome.superPercentage = income.superPercentage;

    return newIncome;
  }

  calculate(dataInput: DataInput): Result {
    const result = new Result(dataInput);
    const income = new Income(result.input.income, result.input.period);
    income.includeSuper = result.input.includeSuper;
    income.superPercentage = result.input.superPercentage;

    const incomeWithoutSuper = this._converter.convert(this.getIncomeWithoutSuper(income), Period.Annually);

    result.beforeAnnualTaxIncome = incomeWithoutSuper.amount;
    result.incomeThresholds = this._taxThresholds.getByYear(dataInput.taxYear);

    result.highestThreshold = result.incomeThresholds.find(
      (taxThreshold) => 
        incomeWithoutSuper.amount >= taxThreshold.min && 
        (!taxThreshold.max || incomeWithoutSuper.amount <= taxThreshold.max)
    )!;

    
    result.taxAnnual = Math.abs((result.highestThreshold.base + (incomeWithoutSuper.amount - 
      result.highestThreshold.min - 1) * result.highestThreshold.rate));

    result.afterAnnualTaxIncome = incomeWithoutSuper.amount - result.taxAnnual;

    result.superAnnual = incomeWithoutSuper.amount * income.superPercentage;
    console.log(result.superAnnual);
    // TODO to calculate the medicare levi
// (700 - x ) / 700 = 0.11
// 700 - x = 0.11 * 700
// 700 - 0.11 * 700 =  x
    return result;
  }
}
