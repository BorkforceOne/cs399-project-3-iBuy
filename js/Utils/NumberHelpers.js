import 'number-to-locale-string';

Number.prototype.toCurrency = function() {
    return this.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })
};