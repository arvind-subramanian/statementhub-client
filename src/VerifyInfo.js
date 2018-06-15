import React, { Component } from 'react'
import TransactionTable from './TransactionTable'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
const ServerApi = require('./ServerApi')
import './css/ResourceDetailsForm.css'



function validate(queryparam, selected) {
  return {
    queryparam: queryparam.length === 0,
    selected: selected.value === "two",
  };
}

class VerifyInfo extends React.Component {
  constructor({dataFromApiParent}) {
    super();
    this.state = {
      queryparam: '',
      password: '',
      dataFromApi:dataFromApiParent,
      selected: { value: 'two', label: 'Two'},
      touched: {
        queryparam: false,
        selected: false,
      },
    };
    this._onSelect = this._onSelect.bind(this)
    this.renderForm =this.renderForm.bind(this);
    this.renderLoading=this.renderLoading.bind(this);
  }

  handlequeryparamChange = (evt) => {
    this.setState({ queryparam: evt.target.value });
  }


  _onSelect (option) {
   console.log('You selected ', option.label, option.value)
   this.setState({selected: option})
 }

  handleSelectChange =(evt) => {
  console.log("Selecting Option",evt.target.value )
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  handleSubmit = (evt) => {
    console.log("In handlesubmit clickhandler")
    evt.preventDefault();
    if (!this.canBeSubmitted()) {
      console.log("In prevemt default handle submit")
      evt.preventDefault();
      return;
    }
    const { queryparam } = this.state;
    let stateVariable = this
    var that = this
    var endpoint = ServerApi.SearchTransactionInformation(this.state.selected.value,this.state.queryparam, that, this.props.callbackParent)
    console.log("Gave request to fetch json" )
  }

  canBeSubmitted() {
    const errors = validate(this.state.queryparam, this.state.selected);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

renderForm() {
  const errors = validate(this.state.queryparam, this.state.selected);
  const isDisabled = Object.keys(errors).some(x => errors[x]);

  const options = [
     { value: 'Initiator', label: 'Ethereum Adress of User' },
     { value: 'ResourceContent', label: 'Resource Content' },
     { value: 'ResourcePattern', label: 'Resource Pattern' },
     {value:'TransactionHash' ,label:'Ethereum Transaction Hash'},
   ]
   const defaultOption = options[0].label

   const shouldMarkError = (field) => {
    const hasError = errors[field];
    const shouldShow = this.state.touched[field];

    return hasError ? shouldShow : false;
  };
  return(
  <div>
  <form onSubmit={this.handleSubmit}>
  <Dropdown options={options}  onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
    <input
      className={shouldMarkError('queryparam') ? "error" : ""}
      type="text"
      placeholder="Enter Query Parameter"
      value={this.state.queryparam}
      onChange={this.handlequeryparamChange}
      onBlur={this.handleBlur('queryparam')}
    />
    <button disabled={isDisabled}>Query Information </button>
  </form>
  </div>);
}

renderTable(){
  return (<div><TransactionTable dataFromApi={this.state.dataFromApi}/> </div>);
}

renderLoading(){
  return (<div><h2>Loading</h2> </div>);
}

render() {
    return this.renderForm()
}


}

export default VerifyInfo
