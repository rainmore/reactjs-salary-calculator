import { Income } from "./models/Income";

type IncomeViewProps = {
  income: Income;
};

const NUMBER_FORMAT = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });

export default function IncomeView({ income }: IncomeViewProps) {
  const data = NUMBER_FORMAT.format(income ? income.amount : 0);
  return <td className="whitespace-nowrap px-6 py-4">{data}</td>;
}
