export enum Period {
  Annually,
  Monthly,
  Fortnightly,
  Weekly,
  Daily,
  Hourly,
}

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
          return income.amount * 38 * 52;
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
          return annualIncome / 38 / 52;
      }
    };

    const annualIncome = convertToAnnually(income);

    return new Income(convert(annualIncome, period), period);
  }
}
