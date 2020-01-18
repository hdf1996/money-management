import React, { useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import formatMoney from '../utils/formatMoney';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';

const TransactionList = () => {
  const [transactions, setTransactions] = useState(null)
  useEffect(() => {
    fetch('/api/v1/transactions')
      .then(res => res.json())
      .then(body => setTransactions(body))
  }, [])
  if(transactions === null) return (
    <Spinner animation="grow" role="status">
      <span className="sr-only">Loading transactions...</span>
    </Spinner>
  )
  return (
    <Container>
      <h1>Transactions history</h1>
      {
        transactions.length === 0 ?
          'No transactions' :
          (
            <Accordion>
              {transactions.map((transaction, index) => (
                <Card key={transaction.id}>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="text" eventKey={transaction.id}>
                      {capitalizeFirstLetter(transaction.type)} - {formatMoney(transaction.amount)}
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={transaction.id}>
                    <Card.Body>
                      <ListGroup>
                        <ListGroup.Item><strong>ID:</strong> {transaction.id}</ListGroup.Item>
                        <ListGroup.Item><strong>Date:</strong> {new Date(transaction.effectiveDate).toLocaleDateString()}</ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
          )
      }
    </Container>
  )
}

export default TransactionList
