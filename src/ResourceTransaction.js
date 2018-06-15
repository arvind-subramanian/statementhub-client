import React, { Component } from 'react'
import ResourceDetailsForm from './ResourceDetailsForm'
import TransactionTable from './TransactionTable'
var Loader = require('react-loader');

class ResourceTransaction extends React.Component {

  constructor(props) {
    super(props)
    this.state ={
      transactionHash:'',
      isLoaded:true,
    };
    this.renderWithTransaction = this.renderWithTransaction.bind(this)
    this.renderWithoutTransaction = this.renderWithoutTransaction.bind(this)
  }

  onChildChanged(transactionHashValue) {
  this.setState({ transactionHash: transactionHashValue })
  }

  displayLoader(value) {
    console.log("Setting loader to", value)
  this.setState({ isLoaded: value })
  }



  renderWithTransaction(){
  return(
    <div>
    <ResourceDetailsForm transactionHashParent={this.state.transactionHash}  callbackParent={(newState) => this.onChildChanged(newState)}
    callbackParentLoader={(newState) => this.displayLoader(newState)}
     />
     <Loader loaded={this.state.isLoaded}  className="spinner" />
    <div> <h1>TransactionHash = {this.state.transactionHash}</h1> </div>
    </div>
  );
  }

renderWithoutTransaction(){
  return(
    <div>
    <ResourceDetailsForm transactionHashParent={this.state.transactionHash}  callbackParent={(newState) => this.onChildChanged(newState)}
    callbackParentLoader={(newState) => this.displayLoader(newState)}
     />
     <Loader loaded={this.state.isLoaded}  className="spinner" />
    </div>
  );
  }



  render(){

  if(!this.state.transactionHash)
  {
    return this.renderWithoutTransaction();
  }
  else {
    return this.renderWithTransaction();
  }
  }

  }
  export default ResourceTransaction
