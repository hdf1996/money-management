const balance = require('../utils/balance');

const balanceIndex = (transactionsList) => (req, res) => {
  res.send({ balance: balance(transactionsList) });
};

module.exports = {
  balanceIndex
};
