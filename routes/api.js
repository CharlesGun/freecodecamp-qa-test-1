'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    if (convertHandler.getNum(input) === 'invalid number' && convertHandler.getUnit(input) === 'invalid unit') {
      return res.status(200).json('invalid number and unit');
    } else if (convertHandler.getNum(input) === 'invalid number') {
      return res.status(200).json('invalid number');
    } else if (convertHandler.getUnit(input) === 'invalid unit') {
      return res.status(200).json('invalid unit');
    }

    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);

    const response = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: convertHandler.getString(initNum, convertHandler.spellOutUnit(initUnit), returnNum, convertHandler.spellOutUnit(returnUnit))
    };

    return res.status(200).json(response);

  });

};