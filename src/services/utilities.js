import numeral from 'numeral';

export const formatCurrency = amount => `₦${numeral(amount).format('0,0.00')}`;
