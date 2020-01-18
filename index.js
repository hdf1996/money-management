const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const { transactionsIndex, transactionsShow, transactionsCreate } = require('./src/controllers/transactions');
const { balanceCalculate } = require('./src/controllers/balance');

const transactionsList = []

app.use(bodyParser.json())

app.get('/api/v1/transactions', transactionsIndex(transactionsList));
app.post('/api/v1/transactions', transactionsCreate(transactionsList));
app.get('/api/v1/transactions/:id', transactionsShow(transactionsList));

app.get('/api/v1/balance', balanceCalculate(transactionsList));


app.listen(port, () => console.log(`Money Accounting listening on port ${port}!`));
