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
    <table className="table-auto min-w-full text-left text-sm font-light text-surface">
      <thead className="border-b border-neutral-200 bg-neutral-50 font-medium">
        <tr>
          <th  className="px-6 py-4">
            {result.input.taxYear - 1} - {result.input.taxYear}
          </th>
          {INCOME_PERIOD_LIST.map(p => (
            <th key={p} className="px-6 py-4">{p}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10">
          <th  className="whitespace-nowrap px-6 py-4 font-medium">After Tax</th>
          {alterTaxIncomes.map((income) => (
            <IncomeView key={`after-tax-${income.period}`} {...{ income }} />
          ))}
        </tr>
        <tr className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10">
          <th className="whitespace-nowrap px-6 py-4 font-medium">Taxable Income</th>
          {beforeTaxIncomes.map((income) => (
            <IncomeView key={`before-tax-${income.period}`} {...{ income }} />
          ))}
        </tr>
        <tr className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10">
          <th  className="whitespace-nowrap px-6 py-4 font-medium">Total tax</th>
          {taxes.map((income) => (
            <IncomeView key={`tax-${income.period}`} {...{ income }} />
          ))}
        </tr>
      </tbody>
    </table>
  );
}

