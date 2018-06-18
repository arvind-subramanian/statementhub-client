import React, { Component } from 'react'
import VerifyInfo from './VerifyInfo'
import TransactionTable from '../TransactionTable'

class FormTable extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      somevar: '',
      password: '',
      dataFromApi:[]
    };
    this.renderWithTable = this.renderWithTable.bind(this)
    this.renderWithoutTable = this.renderWithoutTable.bind(this)
  }

  onChildChanged(jsonArray) {
  this.setState({ dataFromApi: jsonArray })
}



renderWithTable(){
  return(
    <div>
    <VerifyInfo dataFromApiParent={this.state.dataFromApi}  callbackParent={(newState) => this.onChildChanged(newState)} />
    <TransactionTable dataFromApi={this.state.dataFromApi}/>
    </div>
  );
}

renderWithoutTable(){
  return(
    <div>
    <VerifyInfo dataFromApiParent={this.state.dataFromApi}  callbackParent={(newState) => this.onChildChanged(newState)} />
    </div>
  );
}



render(){

  if(!Array.isArray(this.state.dataFromApi) || !this.state.dataFromApi.length)
  {
    return this.renderWithoutTable();
  }
  else {
    return this.renderWithTable();

  }
}

}
export default FormTable
