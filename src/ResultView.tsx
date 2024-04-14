import IncomeView from "./IncomeView";
import { Result } from "./models/Calculator";
import { Income, IncomeConvert, INCOME_PERIOD_LIST, Period } from "./models/Income";

type ResultViewProps = {
  result: Result;
};

export default function ResultView({ result }: ResultViewProps) {
  const converter = new IncomeConvert();
  const tax = new Income(result.taxAnnual, Period.Annually);
  const incomeTax = new Income(result.incomeTaxAnnual, Period.Annually);
  const medicareLevy = new Income(result.medicareLevelAnnual, Period.Annually);
  const afterTaxIncome = new Income(result.afterAnnualTaxIncome, Period.Annually);
  const beforeTaxIncome = new Income(result.beforeAnnualTaxIncome, Period.Annually);
  const superannuation = new Income(result.beforeAnnualTaxIncome * result.input.superPercentage, Period.Annually);

  const taxes = INCOME_PERIOD_LIST.map((p) => converter.convert(tax, p));
  const incomeTaxes = INCOME_PERIOD_LIST.map((p) => converter.convert(incomeTax, p));
  const medicareLevies = INCOME_PERIOD_LIST.map((p) => converter.convert(medicareLevy, p));

  const alterTaxIncomes = INCOME_PERIOD_LIST.map((p) => converter.convert(afterTaxIncome, p));
  const beforeTaxIncomes = INCOME_PERIOD_LIST.map((p) => converter.convert(beforeTaxIncome, p));
  const superannuations = INCOME_PERIOD_LIST.map((p) => converter.convert(superannuation, p));
  return (
    <table className="text-surface min-w-full table-auto text-left text-sm font-light">
      <caption className="px-6 py-4 caption-bottom bg-neutral-100 text-left text-sm ">
        Income tax: {result.highestThreshold?.description} <br />
        Medicare levy: 2%
      </caption>
      <thead className="border-b border-neutral-200 bg-neutral-50 font-medium">
        <tr>
          <th className="px-6 py-4">
            {result.input.taxYear - 1} - {result.input.taxYear}
          </th>
          {INCOME_PERIOD_LIST.map((p) => (
            <th key={p} className="px-6 py-4">
              {p}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100">
          <th className="whitespace-nowrap px-6 py-4 font-medium">After Tax</th>
          {alterTaxIncomes.map((income) => (
            <IncomeView key={`after-tax-${income.period}`} {...{ income }} />
          ))}
        </tr>
        <tr className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100">
          <th className="whitespace-nowrap px-6 py-4 font-medium">Taxable Income</th>
          {beforeTaxIncomes.map((income) => (
            <IncomeView key={`before-tax-${income.period}`} {...{ income }} />
          ))}
        </tr>
        <tr className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100">
          <th className="whitespace-nowrap px-6 py-4 font-medium">
            Total tax&nbsp;
            <br />
            <span className="text-xs font-light">= Income tax + Medicare Levy</span>
          </th>
          {taxes.map((income) => (
            <IncomeView key={`tax-${income.period}`} {...{ income }} />
          ))}
        </tr>
        <tr className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100">
          <th className="whitespace-nowrap px-6 py-4 font-normal">Income tax</th>
          {incomeTaxes.map((income) => (
            <IncomeView key={`income-tax-${income.period}`} {...{ income }} />
          ))}
        </tr>
        <tr className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100">
          <th className="whitespace-nowrap px-6 py-4 font-normal">Medicare Level</th>
          {medicareLevies.map((income) => (
            <IncomeView key={`income-tax-${income.period}`} {...{ income }} />
          ))}
        </tr>
        <tr className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100">
          <th className="whitespace-nowrap px-6 py-4 font-medium">Superannuation</th>
          {superannuations.map((income) => (
            <IncomeView key={`before-tax-${income.period}`} {...{ income }} />
          ))}
        </tr>
      </tbody>
    </table>
  );
}
