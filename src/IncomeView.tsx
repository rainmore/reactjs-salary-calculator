import { Income } from "./models/Income";

type IncomeViewProps = {
  income: Income
}

function IncomeView({income}: IncomeViewProps) {
  const data = income ? income.amount : 0;
  return (
      <td>{data.toFixed(2)}</td>
  );
}

export default IncomeView;
