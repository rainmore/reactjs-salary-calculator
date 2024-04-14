import { Calculator, Result } from "./models/Calculator";
import { INCOME_PERIOD_LIST, Period } from "./models/Income";
import { TaxThresholds } from "./models/TaxThresholds";


type FormViewProps = {
  calculator: Calculator;
  result: Result;
  handleResult(r: Result): void;
}

const TAX_THRESHOLDS = new TaxThresholds().getYears();

export default function FormView( {calculator, result, handleResult} : FormViewProps) {

  // const [result, setResult] = useState<Result>(RESULT_DEFAULT);
  
  const parseFormData = (formData: FormData): void => {
    const formJson = Object.fromEntries(formData.entries());
    result.input.taxYear = Number(formJson["taxYear"]);
    result.input.superPercentage = Number(formJson["superannuation"]) / 100;
    result.input.income = Number(formJson["income"]);
    result.input.includeSuper = !!formJson["includeSuper"];
    result.input.numberOfHoliday = Number(formJson["numberOfHoliday"]);
    result.input.isContractRole = !!formJson["isContractRole"];
    result.input.period = formJson["period"] as Period;
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    parseFormData(formData);
    const newResult = calculator.calculate(result.input);
    console.log(newResult);
    handleResult(newResult);
  };

  return (
    <form onSubmit={handleSubmit}>
          <label htmlFor="income">Pay</label>
          <input type="number" name="income" id="income" min="1" defaultValue={result.input.income} />
          <label htmlFor="period">Time Period</label>
          <select name="period" id="period" defaultValue={result.input.period}>
            {INCOME_PERIOD_LIST.map((p) => (
              <option key={`period-option-${p}`} value={p}>
                {p}
              </option>
            ))}
          </select>
          <label htmlFor="taxYear">Tax Year</label>
          <select name="taxYear" id="taxYear" defaultValue={result.input.taxYear}>
            {TAX_THRESHOLDS.map((year) => (
              <option key={`taxYear-${year}`} value={year}>
                {year} ~ {year + 1}
              </option>
            ))}
          </select>
          <label htmlFor="superannuation">Superannuation (%)</label>
          <input
            type="number"
            name="superannuation"
            id="superannuation"
            min="1"
            max="100"
            defaultValue={(result.input.superPercentage * 100).toFixed(0)}
          />
          <label htmlFor="includeSuper">Include Superannuation</label>
          <input type="checkbox" name="includeSuper" id="includeSuper" defaultChecked={result.input.includeSuper} />

          <label htmlFor="numberOfHoliday">Number of Holiday</label>
          <input type="number" name="numberOfHoliday" id="nnumberOfHoliday" defaultValue={result.input.numberOfHoliday} />

          <label htmlFor="isContractRole">Is Contract Role</label>
          <input type="checkbox" name="isContractRole" id="isContractRole" defaultChecked={result.input.isContractRole} />

          <button type="submit">Calculate</button>
        </form>
  );
}
