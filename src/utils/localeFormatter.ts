export const localeFormatter = (currency: string, balance: number) => {
    let locale = "";

    switch(currency) {
        case 'MXN':
            locale = 'en-MX'
            break;
        case 'BRL':
            locale = 'pt-BR'
            break;
        case 'COP':
            locale = 'es-CO'
            break;
    }

    return balance.toLocaleString(locale, { style: "currency", currency})
}