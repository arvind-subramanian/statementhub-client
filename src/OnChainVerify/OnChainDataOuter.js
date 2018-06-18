import React, { Component } from 'react'
import VerifyOnChain from './VerifyOnChain'
import OnChainDataTable from './OnChainDataTable'



class OnChainDataOuter extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      dataFromApi:[],
      isIdentical:''
    };
    this.renderWithData = this.renderWithData.bind(this)
    this.renderWithoutData = this.renderWithoutData.bind(this)

  }

    onChildChanged(jsonArray) {
      console.log("Setting setState in parent", jsonArray)
    this.setState({ dataFromApi: jsonArray })
  }

  childCompareAndSet(compare) {
    console.log("Setting setState in parent", compare)
  this.setState({ isIdentical: compare })
}



  renderWithData(){
    return(
      <div>
      <VerifyOnChain callbackParent={(newState) => this.onChildChanged(newState)}  callbackCompare={(newState) => this.childCompareAndSet(newState)}   />
      <OnChainDataTable dataFromApi={this.state.dataFromApi}/>
      <div><h1>Contents in Contract is {this.state.isIdentical} </h1></div>
      </div>
    );
  }

  renderWithoutData(){
    return(
      <div>
      <VerifyOnChain   callbackParent={(newState) => this.onChildChanged(newState)} callbackCompare={(newState) => this.childCompareAndSet(newState)} />
      </div>
    );
  }

  render(){

    if(!Array.isArray(this.state.dataFromApi) || !this.state.dataFromApi.length)
    {
      return this.renderWithoutData();
    }
    else {
      return this.renderWithData();

    }
  }
}
export default OnChainDataOuter
