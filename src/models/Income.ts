export enum Period {
  Annually = "Annually",
  Monthly = "Monthly",
  Fortnightly = "Fortnightly",
  Weekly = "Weekly",
  Daily = "Daily",
  Hourly = "Hourly",
}

export const INCOME_PERIOD_LIST = [
  Period.Hourly,
  Period.Daily,
  Period.Weekly,
  Period.Fortnightly,
  Period.Monthly,
  Period.Annually,
];

export class Income {
  amount: number = 0;
  period: Period = Period.Annually;

  includeSuper: boolean = false;
  superPercentage: number = 11;

  constructor(amount: number, period: Period) {
    this.amount = amount;
    this.period = period;
  }
}

export class IncomeConvert {

  private weeklyHours: number = 37.5;
  convert(income: Income, period: Period): Income {
    if (period === income.period) {
      return income;
    }

    const convertToAnnually = (income: Income): number => {
      switch (income.period) {
        case Period.Annually:
          return income.amount;
        case Period.Monthly:
          return income.amount * 12;
        case Period.Fortnightly:
          return income.amount * 26;
        case Period.Weekly:
          return income.amount * 52;
        case Period.Daily:
          return income.amount * 5 * 52;
        case Period.Hourly:
          return income.amount * this.weeklyHours * 52;
      }
    };

    const convert = (annualIncome: number, period: Period): number => {
      switch (period) {
        case Period.Annually:
          return annualIncome;
        case Period.Monthly:
          return annualIncome / 12;
        case Period.Fortnightly:
          return annualIncome / 26;
        case Period.Weekly:
          return annualIncome / 52;
        case Period.Daily:
          return annualIncome / 5 / 52;
        case Period.Hourly:
          return annualIncome / this.weeklyHours / 52;
      }
    };

    const annualIncome = convertToAnnually(income);
    const convert1 = convert(annualIncome, period);

    return new Income(convert1, period);
  }
}
