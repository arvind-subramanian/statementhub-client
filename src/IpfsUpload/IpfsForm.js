import React, { Component } from 'react'
const ServerApi = require('../ServerApi')

function validate(queryparam) {
  return {
    queryparam: queryparam.length === 0,
  };
}

function validateForipfs(jsondata) {
  return {
    jsondata:(!Array.isArray(jsondata) || !jsondata)
  };

}


class IpfsForm extends React.Component {

  constructor({dataFromApiParent}) {
    super();
    this.state = {
      queryparam: '',
      dataFromApi:dataFromApiParent,
      touched: {
        queryparam: false,
      },
    };
    this.renderForm =this.renderForm.bind(this);
  }


  canBeSubmitted() {
    const errors = validate(this.state.queryparam, this.state.selected);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }
  handlequeryparamChange = (evt) => {
    this.setState({ queryparam: evt.target.value });
  }

  canBeSubmittedForIpfs() {
    const errors = validateForipfs(this.state.dataFromApi);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleSubmit = (evt) => {
    console.log("In handlesubmit clickhandler of Lookup TransactionHash")
    evt.preventDefault();
    if (!this.canBeSubmitted()) {
      console.log("In prevent default handle submit")
      evt.preventDefault();
      return;
    }
    const { queryparam } = this.state;
    let stateVariable = this
    var that = this
   ServerApi.SearchTransactionInformation("TransactionHash",this.state.queryparam, that, this.props.callbackParent)
   this.props.callbackSetHash(this.state.queryparam)
    console.log("Gave request to fetch json" )
  }

  renderForm() {
    const errors = validate(this.state.queryparam);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const isDisabledTillTransaction = validateForipfs(this.state.dataFromApi)

    const shouldMarkError = (field) => {
     const hasError = errors[field];
     const shouldShow = this.state.touched[field];

     return hasError ? shouldShow : false;
   };

    return(<div>
    <form onSubmit={this.handleSubmit}>
      <input
        className={shouldMarkError('queryparam') ? "error" : ""}
        type="text"
        placeholder="Enter Transaction Hash Got From Submitting"
        value={this.state.queryparam}
        onChange={this.handlequeryparamChange}
        onBlur={this.handleBlur('queryparam')}
      />
      <button disabled={isDisabled}>Confirm before IPFS Upload </button>
    </form>
    </div>);
  }
 render() {
   console.log("Calling renderForm")
   return this.renderForm()

 }


  }


  export default IpfsForm
