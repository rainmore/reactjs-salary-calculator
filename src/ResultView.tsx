import IncomeView from "./IncomeView";
import { Result } from "./models/Calculator";
import { Income, IncomeConvert, INCOME_PERIOD_LIST } from "./models/Income";

type ResultViewProps = {
  result: Result;
};

function ResultView({ result }: ResultViewProps) {
  const converter = new IncomeConvert();
  const alterTaxIncomes = INCOME_PERIOD_LIST.map((p) => converter.convert(new Income(result.afterTaxIncome, result.getIncome().period), p));

  const beforeTaxIncomes = INCOME_PERIOD_LIST.map((p) => converter.convert(result.getIncome(), p));

  const taxes = INCOME_PERIOD_LIST.map((p) => converter.convert(new Income(result.tax, result.getIncome().period), p));

  console.log(alterTaxIncomes, beforeTaxIncomes, taxes);

  return (
    <table>
      <thead>
        <tr>
          <th>
            {result.input.taxYear - 1} - {result.input.taxYear}
          </th>
          <th>Horely</th>
          <th>Daily</th>
          <th>Weekly</th>
          <th>Fortnightly</th>
          <th>Monthly</th>
          <th>Annually</th>
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

export default ResultView;
