import { Calculator, Result } from "./models/Calculator";
import { INCOME_PERIOD_LIST, Period } from "./models/Income";
import { TaxThresholds } from "./models/TaxThresholds";

type FormViewProps = {
  calculator: Calculator;
  result: Result;
  handleResult(r: Result): void;
};

const TAX_THRESHOLDS = new TaxThresholds().getYears();

export default function FormView({ calculator, result, handleResult }: FormViewProps) {
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
    <form onSubmit={handleSubmit} className="">
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label htmlFor="income" className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
            Pay
          </label>
          <input
            type="number"
            name="income"
            id="income"
            min="1"
            defaultValue={result.input.income}
            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
          />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
          <label htmlFor="period" className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
            Time Period
          </label>
          <div className="relative">
            <select
              name="period"
              id="period"
              defaultValue={result.input.period}
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            >
              {INCOME_PERIOD_LIST.map((p) => (
                <option key={`period-option-${p}`} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label htmlFor="taxYear" className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
            Tax Year
          </label>
          <div className="relative">
            <select
              name="taxYear"
              id="taxYear"
              defaultValue={result.input.taxYear}
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            >
              {TAX_THRESHOLDS.map((year) => (
                <option key={`taxYear-${year}`} value={year}>
                  {year} ~ {year + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">&nbsp;
          </label>
          <button type="submit" className="mt-1 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            Calculate
          </button>
        </div>
      </div>
      <div className="-mx-3 mb-2 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/5">
          <label htmlFor="superannuation" className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
            Superannuation (%)
          </label>
          <input
            type="number"
            name="superannuation"
            id="superannuation"
            min="1"
            max="100"
            defaultValue={(result.input.superPercentage * 100).toFixed(0)}
            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
          />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-2/5">
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">&nbsp;
          </label>
          <label htmlFor="includeSuper" className="block font-bold text-gray-500 md:w-2/3">
            <input
              type="checkbox"
              name="includeSuper"
              id="includeSuper"
              defaultChecked={result.input.includeSuper}
              className="mr-2 leading-tight"
            />
            <span class="text-sm">Include Superannuation</span>
          </label>
        </div>
      </div>
    </form>
  );
}
