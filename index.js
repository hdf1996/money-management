const express = require('express');
const bodyParser = require('body-parser');
// If we had some orm, we can probably
// use that as validator instead of express-validator
// This seems cleaner to me than adding conditionals to the create function
const { body } = require('express-validator');
const app = express();
const port = process.env.PORT || 3000;
const { transactionsIndex, transactionsShow, transactionsCreate } = require('./src/controllers/transactions');
const { balanceCalculate } = require('./src/controllers/balance');

const transactionsList = []

app.use(bodyParser.json())

app.get('/api/v1/transactions', transactionsIndex(transactionsList));
app.post('/api/v1/transactions', [
  body('type').notEmpty().isIn(['debit', 'credit']),
  body('amount').notEmpty().isFloat(),
], transactionsCreate(transactionsList));
app.get('/api/v1/transactions/:id', transactionsShow(transactionsList));

app.get('/api/v1/balance', balanceCalculate(transactionsList));


app.listen(port, () => console.log(`Money Accounting listening on port ${port}!`));
