const uuid = require('uuid-random');
// If we had some orm, we can probably
// use that as validator instead of express-validator
// This seems cleaner to me than adding conditionals to the create function
const { validationResult } = require('express-validator');

const transactionsIndex = (transactionsList) => (req, res) => {
  res.send(transactionsList);
};

const transactionsCreate = (transactionsList) => (req, res) => {
  const errors = validationResult(req)
  if(errors.isEmpty()) {
    const { type, amount } = req.body
    const newTransaction = {
      id: uuid(),
      type,
      amount: parseFloat(amount),
      effectiveDate: new Date()
    };
    transactionsList.push(newTransaction);
    res.status(201).send(newTransaction);
  } else {
    res.status(422).send(errors)
  }
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
