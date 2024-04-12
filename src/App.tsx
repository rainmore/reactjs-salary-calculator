import React, { useState } from "react";
import "./App.css";
import { Calculator, DataInput, Result } from "./models/Calculator";
import ResultView from "./ResultView";

const calculator = new Calculator();
const RESULT_DEFAULT = calculator.calculate(new DataInput());

function App() {
  
  const [formData, setFormData] = useState(RESULT_DEFAULT.input);
  const [result, setResult] = useState(RESULT_DEFAULT);

  const handleChange = (event: React.ChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  
  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    console.log(formData);

    const r = (formData as DataInput);
    r.income = Number(r.income);
    
    const newResult = calculator.calculate(r);
    setResult(newResult);
  }

  return (
    <>
      <h1>Salary Calculator</h1>
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit}>
          <label htmlFor="income">
            Pay
          </label>
          <input type="number" name="income" id="income" min="1" value={formData.income} onChange={handleChange} />
          <label htmlFor="period">
            Time Period
          </label>
          <select name="period" id="period" value={formData.period} onChange={handleChange} >
            <option value="Annually">Annually</option>
            <option value="Monthly">Monthly</option>
            <option value="Fortnightly">Fortnightly</option>
            <option value="Weekly">Weekly</option>
            <option value="Daily">Daily</option>
            <option value="Hourly">Hourly</option>
          </select>
          <label htmlFor="tax-year">
            Tax Year
          </label>
          <select name="tax-year" id="tax-year" value={formData.taxYear} onChange={handleChange} >
            <option value="2023">2023 ~ 2024</option>
            <option value="2024">2024 ~ 2025</option>
            <option value="2025">2025 ~ 2026</option>
          </select>
          <label htmlFor="superannuation">
            Superannuation (%)
          </label>
          <input type="number" name="superannuation" id="superannuation" min="1" max="100" value={formData.superPercentage} onChange={handleChange} />
          <label htmlFor="include-super">
            Include Superannuation
          </label>
          <input type="checkbox" name="include-super" id="include-super" checked={formData.includeSuper} onChange={handleChange} />

          <label htmlFor="number-of-holiday">
            Number of Holiday
          </label>
          <input type="number" name="number-of-holiday" id="number-of-holiday" value={formData.numberOfHoliday} onChange={handleChange}  />

          <label htmlFor="is-contract-role">
            Is Contract Role
          </label>
          <input type="checkbox" name="is-contract-role" id="is-contract-role" checked={formData.isContractRole} onChange={handleChange} />

          <button type="submit">Calculate</button>
        </form>

        
      </div>
      <div>
        <ResultView {... {result}} />
      </div>
      
    </>
  );
}

export default App;
