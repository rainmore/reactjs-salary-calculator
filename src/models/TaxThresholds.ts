export class TaxThreshold {
  rate: number;
  min: number;
  max?: number;
  description?: string;
  base: number = 0;

  constructor(rate: number, min: number, max?: number, base?: number, description?: string) {
    this.rate = rate;
    this.max = max;
    this.min = min;
    this.base = base ? base : 0;
    this.description = description;
  }
}

export class TaxThresholds {
  
  private _threshods: Map<number, TaxThreshold[]> = new Map<number, TaxThreshold[]>([
    // https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents#ato-AbouttaxratesforAustralianresidents
    [
      2022,
      [
        new TaxThreshold(0, 0, 18200, 0, "Nil"),
        new TaxThreshold(0.16, 18201, 45000, 0, "19c for each $1 over $18,200"),
        new TaxThreshold(0.325, 45001, 120000, 5092, "$5,092 plus 32.5c for each $1 over $45,000"),
        new TaxThreshold(0.37, 120001, 180000, 29467, "$29,467 plus 37c for each $1 over $120,000"),
        new TaxThreshold(0.45, 180001, undefined, 51667, "$51,667 plus 45c for each $1 over $180,000"),
      ],
    ],
    // https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents#ato-AbouttaxratesforAustralianresidents
    [
      2023,
      [
        new TaxThreshold(0, 0, 18200, 0, "Nil"),
        new TaxThreshold(0.19, 18201, 45000, 0, "19c for each $1 over $18,200"),
        new TaxThreshold(0.325, 45001, 120000, 5092, "$5,092 plus 32.5c for each $1 over $45,000"),
        new TaxThreshold(0.37, 120001, 180000, 29467, "$29,467 plus 37c for each $1 over $120,000"),
        new TaxThreshold(0.45, 180001, undefined, 51667, "$51,667 plus 45c for each $1 over $180,000"),
      ],
    ],
    // https://www.ato.gov.au/about-ato/new-legislation/in-detail/individuals/individual-income-tax-rates-and-threshold-changes
    [
      2024,
      [
        new TaxThreshold(0, 0, 18200, 0, "Nil"),
        new TaxThreshold(0.16, 18201, 45000, 0, "16c for each $1 over $18,200"),
        new TaxThreshold(0.3, 45001, 135000, 4288, "$4,288 plus 30c for each $1 over $45,000"),
        new TaxThreshold(0.37, 135001, 190000, 31288, "$31,288 plus 37c for each $1 over $135,000"),
        new TaxThreshold(0.45, 190001, undefined, 47938, "$47,938 plus 45c for each $1 over $180,000"),
      ],
    ],
    
  ]);

  getByYear(year: number): TaxThreshold[] {
    return this._threshods.get(year)!;
  }

  getYears(): number[] {
    return Array.from(this._threshods.keys()).sort((a, b) => a - b);
  }
}
