const uuid = require('uuid-random');

const transactionsIndex = (transactionsList) => (req, res) => {
  res.send(transactionsList);
};

const transactionsCreate = (transactionsList) => (req, res) => {
  const { type, amount } = req.body
  const newTransaction = {
    id: uuid(),
    type,
    amount,
    effectiveDate: new Date()
  };
  transactionsList.push(newTransaction);
  res.status(201).send(newTransaction);
}

const transactionsShow = (transactionsList) => (req, res) => {
  const transaction = transactionsList.find(({id}) => id === req.params.id)
  if(!transaction) return res.status(404).send({ message: 'Not found' })
  res.send(transaction);
};

module.exports = {
  transactionsIndex,
  transactionsCreate,
  transactionsShow
}
