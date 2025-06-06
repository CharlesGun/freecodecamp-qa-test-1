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
    // lets assume we got input like this input = 3,1lbs or 3,1/2lbs
    // we need to extract the number part and can have more than 1 fraction
    // e.g. 3,1/2lbs or 3,1/2/3lbs
    const numRegex = /[0-9]+([.,][0-9]+)?(\/[0-9]+([.,][0-9]+)?)*/;

    const match = input.match(numRegex);
    if (!input) {
      return 1;
    }
    if (!match) {
      return 1;
    }
    if(match[0].includes('/')) {
      const parts = match[0].split('/');
      if (parts.length > 2) {
        return 'invalid number';
      }
      const numerator = parseFloat(parts[0].replace(',', '.'));
      const denominator = parseFloat(parts[1].replace(',', '.'));
      if (denominator === 0) {
        return 'invalid number';
      }
      return Number(numerator / denominator);
    }

    return Number(match[0]);
  };

  this.getUnit = function (input) {
    // lets assume we got input like this input = 3,1lbs or LBS
    // so we need the regex that matches to upper and lower case letters
    const unitRegex = /[a-zA-Z]+/;
    const match = input.match(unitRegex);
    if (match[0] !== 'L') {
      match[0] = match[0].toLowerCase();
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