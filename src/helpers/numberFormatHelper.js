export const addCurrencyZeroes = (amount) => {

    let currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return currency.format(amount);
}