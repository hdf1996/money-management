const balance = transactionsList => transactionsList.reduce((accumulator, transaction) => {
  // We can also assume that if it is not debit, is credit, since we validate
  // That the type is included in one of those strings
  // But i preferred to be explicit here since it involves money
  if(transaction.type === 'debit') accumulator -= transaction.amount;
  if(transaction.type === 'credit') accumulator += transaction.amount;
  return accumulator;
}, 0);

module.exports = balance;
