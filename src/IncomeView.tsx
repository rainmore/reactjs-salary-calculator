import { Income } from "./models/Income";

type IncomeViewProps = {
  income: Income
}

export default function IncomeView({ income }: IncomeViewProps) {
  const data = income ? income.amount : 0;
  return (
      <td  className="whitespace-nowrap px-6 py-4">${data.toFixed(2)}</td>
  );
}

