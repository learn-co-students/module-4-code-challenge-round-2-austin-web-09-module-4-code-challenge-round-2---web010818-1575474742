import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'
// import {transactions} from '../transactionsData'

class AccountContainer extends Component {

  constructor() {
    super()
    this.state = {
      allTransactions: [],
      searchedTransactions: null
      // query: ''
    }



    // get a default state working with the data imported from TransactionsData
    // use this to get the functionality working
    // then replace the default transactions with a call to the API

  }

  componentDidMount() {
    fetch('https://boiling-brook-94902.herokuapp.com/transactions')
    .then(r => r.json())
    .then(data => {
      this.setState({allTransactions: data})
    })
  }

  handleChange = (event) => {
    this.setState(prevTransactions => {
      const searchedTransactions = prevTransactions.allTransactions.filter(transaction => 
        transaction.description.toLowerCase().includes(event.toLowerCase())
        ||
        transaction.category.toLowerCase().includes(event.toLowerCase())
        )
      return {
        searchedTransactions
      }
    })
  }

  render() {

    return (
      <div>
        <Search onChange={this.handleChange} />
        <TransactionsList 
        transactions={
          this.state.searchedTransactions ?
          this.state.searchedTransactions
          :
          this.state.allTransactions
        }


        />
      </div>
    )
  }
}

export default AccountContainer
