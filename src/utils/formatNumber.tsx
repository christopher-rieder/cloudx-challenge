import numeral from 'numeral';
import 'numeral/locales/es';

numeral.locale('es');

export function fCurrency(number: string | number) {
  return numeral(number).format('$0,0');
}

export function fPercent(number: string | number) {
  return numeral(Number(number) / 100).format('0.0%');
}

export function fNumber(number: string | number) {
  return numeral(number).format();
}
