const units = {
  gal: 'gallons',
  L: 'liters',
  lbs: 'pounds',
  kg: 'kilograms',
  mi: 'miles',
  km: 'kilometers',
};

const convertions = {
  gal: 'L',
  L: 'gal',
  lbs: 'kg',
  kg: 'lbs',
  mi: 'km',
  km: 'mi'
};

function ConvertHandler() {

  this.getNum = function (input) {

    if (!input || typeof input !== 'string') return 1;

    const sanitized = input.trim();

    // Extract the numeric part (up to the first letter)
    const numberMatch = sanitized.match(/^[^a-zA-Z]*/);
    const numberPart = numberMatch ? numberMatch[0] : '';

    // If there's no numeric part but unit exists, return 1
    if (!numberPart || /^[\s]*$/.test(numberPart)) {
      return /^[a-zA-Z]+$/.test(sanitized) ? 1 : 'invalid number';
    }

    // Validate allowed characters
    if (/[^0-9.,\/]/.test(numberPart)) {
      return 'invalid number';
    }

    // Disallow multiple fractions
    if ((numberPart.match(/\//g) || []).length > 1) {
      return 'invalid number';
    }

    // Handle fraction
    if (numberPart.includes('/')) {
      const [numeratorStr, denominatorStr] = numberPart.split('/');

      if (!numeratorStr || !denominatorStr) return 'invalid number';

      if (
        (numeratorStr.match(/[.,]/g) || []).length > 1 ||
        (denominatorStr.match(/[.,]/g) || []).length > 1
      ) {
        return 'invalid number';
      }

      const numerator = parseFloat(numeratorStr.replace(',', '.'));
      const denominator = parseFloat(denominatorStr.replace(',', '.'));

      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        return 'invalid number';
      }

      return Number(numerator / denominator);
    }

    // Single number (not a fraction)
    if ((numberPart.match(/[.,]/g) || []).length > 1) {
      return 'invalid number';
    }

    const value = parseFloat(numberPart.replace(',', '.'));
    return isNaN(value) ? 'invalid number' : value;


  };

  this.getUnit = function (input) {
    // lets assume we got input like this input = 3,1lbs or LBS
    // so we need the regex that matches to upper and lower case letters
    const unitRegex = /[a-zA-Z]+/;
    const match = input.match(unitRegex);
    if (match[0] !== 'L') {
      match[0] = match[0].toLowerCase();
    }
    if (match[0] === 'l') {
      match[0] = 'L';
    }
    if (!match || !units[match[0]]) {
      return 'invalid unit';
    }

    return match[0];
  };

  this.getReturnUnit = function (initUnit) {
    return convertions[initUnit];
  };

  this.spellOutUnit = function (unit) {
    return units[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = 0;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;

      case 'L':
        result = initNum / galToL;
        break;

      case 'lbs':
        result = initNum * lbsToKg;
        break;

      case 'kg':
        result = initNum / lbsToKg;
        break;

      case 'mi':
        result = initNum * miToKm;
        break;

      case 'km':
        result = initNum / miToKm;
        break;

      default:
        return 'invalid unit';
    }

    return Number(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };

}

module.exports = ConvertHandler;