import { useState } from "react";
import "./App.css";
import FormView from "./FormView";
import ResultView from "./ResultView";
import { Calculator, DataInput, Result } from "./models/Calculator";


export default function App() {
  const calculator = new Calculator();
  const formData = new DataInput();
  const defaultResult = calculator.calculate(formData);

  const [result, setResult] = useState(defaultResult);

  const handleResult = (r: Result) => {
    setResult(r);
  }

  return (
    <>
      <h1 className="font-bold text-4xl mb-10">Salary Calculator</h1>
      <div>
        <FormView {...{ calculator, result, handleResult}} />
      </div>
      <div>
        <ResultView {...{ result }} />
      </div>
    </>
  );
}
