//https://www.ato.gov.au/businesses-and-organisations/super-for-employers/paying-super-contributions/how-much-super-to-pay
export class Super {
  private _rate: Map<number, number> = new Map<number, number>([
    [2025, 0.12],
    [2024, 0.11],
  ]);

  getRateByYear(year: number): number {
    const key = year > 2025 ? 2025 : 2024;
    return this._rate.get(key)!;
  }
}
