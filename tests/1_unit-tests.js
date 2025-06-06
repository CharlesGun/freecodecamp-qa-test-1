const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('Read a whole number input', ()=>{
        assert.equal(convertHandler.getNum('3/2lbs'), 1.5);

    })
    test('Read a decimal number input', ()=>{
        assert.equal(convertHandler.getNum('3.7L'), 3.7);
    })
    test('Read a fractional input', ()=>{
        assert.equal(convertHandler.getNum('3/2lbs'), 1.5);
    })
    test('Read a fractional input with a decimal', ()=>{
        assert.equal(convertHandler.getNum('3.2/2lbs'), 1.6);
    })
    test('Return error on a double-fraction', ()=>{
        assert.equal(convertHandler.getNum('3/2/2lbs'), 'invalid number');
    })
    test('Return 1 default when no numerical input is provided', ()=>{
        assert.equal(convertHandler.getNum('lbs'), 1);
    })
    test('Read valid input unit', ()=>{
        assert.equal(convertHandler.getUnit('3.1/2lbs'), 'lbs');
    })
    test('Return an error for an invalid input unit', ()=>{
        assert.equal(convertHandler.getUnit('3.1/2lbss'), 'invalid unit');
    })
    test('Return the correct return unit for each valid input unit', ()=>{
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    })
    test('Return the spelled-out string unit for each valid input unit', ()=>{
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    })
    test('Convert gal to L', ()=>{
        assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
    })
    test('Convert L to gal', ()=>{
        assert.equal(convertHandler.convert(3.78541, 'L'), 1);
    })
    test('Convert lbs to kg', ()=>{
        assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
    })
    test('Convert kg to lbs', ()=>{
        assert.equal(convertHandler.convert(0.453592, 'kg'), 1);
    })
    test('Convert mi to km', ()=>{
        assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
    })
    test('Convert km to mi', ()=>{
        assert.equal(convertHandler.convert(1.60934, 'km'), 1);
    })
});