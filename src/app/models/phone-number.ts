export class PhoneNumber {
    country = +91;
  number: number;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.number;
    return `+${num}`;
  }
}
