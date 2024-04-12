import IncomeView from "./IncomeView";
import { Result } from "./models/Calculator";
import { Income, IncomeConvert, INCOME_PERIOD_LIST, Period } from "./models/Income";

type ResultViewProps = {
  result: Result;
}

export default function ResultView({ result }: ResultViewProps) {
  const converter = new IncomeConvert();
  const afterTaxIncome = new Income(result.afterAnnualTaxIncome, Period.Annually);
  const tax = new Income(result.taxAnnual, Period.Annually);
  const beforeTaxIncome = new Income(result.beforeAnnualTaxIncome, Period.Annually);
  
  const taxes = INCOME_PERIOD_LIST.map((p) => converter.convert(tax, p));
  const alterTaxIncomes = INCOME_PERIOD_LIST.map((p) => converter.convert(afterTaxIncome, p));
  const beforeTaxIncomes = INCOME_PERIOD_LIST.map((p) => converter.convert(beforeTaxIncome, p));
  return (
    <table>
      <thead>
        <tr>
          <th>
            {result.input.taxYear - 1} - {result.input.taxYear}
          </th>
          {INCOME_PERIOD_LIST.map(p => (
            <th key={p}>{p}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>After Tax</th>
          {alterTaxIncomes.map((income) => (
            <IncomeView key={`after-tax-${income.period}`} {...{ income }} />
          ))}
        </tr>
        <tr>
          <th>Taxable Income</th>
          {beforeTaxIncomes.map((income) => (
            <IncomeView key={`before-tax-${income.period}`} {...{ income }} />
          ))}
        </tr>
        <tr>
          <th>Total tax</th>
          {taxes.map((income) => (
            <IncomeView key={`tax-${income.period}`} {...{ income }} />
          ))}
        </tr>
      </tbody>
    </table>
  );
}

