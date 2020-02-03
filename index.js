const Bundler = require('parcel-bundler');
const express = require('express');
const bodyParser = require('body-parser');
// If we had some orm, we can probably
// use that as validator instead of express-validator
// This seems cleaner to me than adding conditionals to the create function
const { body } = require('express-validator');
const app = express();
const port = process.env.PORT || 3000;
const bundler = new Bundler('./src/client/index.html', {});

const { transactionsIndex, transactionsShow, transactionsCreate } = require('./src/controllers/transactions');
const { balanceIndex } = require('./src/controllers/balance');
const balance = require('./src/utils/balance');

const transactionsList = [];

app.use(bodyParser.json());

app.get('/api/v1/transactions', transactionsIndex(transactionsList));
app.post('/api/v1/transactions', [
  body('type').notEmpty().isIn(['debit', 'credit']),
  body('amount').notEmpty().isFloat().custom((value, { req }) => {
    if(req.body.amount <= 0) throw new Error('The amount should be a positive value');
    if(req.body.type === 'debit' && balance(transactionsList) - value < 0) {
      throw new Error('The balance cannot be lower than 0 after a transaction');
    }
    return true;
  })
], transactionsCreate(transactionsList));
app.get('/api/v1/transactions/:id', transactionsShow(transactionsList));

app.get('/api/v1/balance', balanceIndex(transactionsList));

app.use(bundler.middleware());

app.listen(port, () => console.log(`Money Accounting listening on port ${port}!`));
