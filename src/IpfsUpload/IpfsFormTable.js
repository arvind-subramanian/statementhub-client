import React, { Component } from 'react'
import IpfsForm from './IpfsForm'
import TransactionTable from '../TransactionTable'
const ServerApi = require('../ServerApi')
import ipfs from './ipfs'
var Loader = require('react-loader');



class IpfsFormTable extends React.Component {
  constructor(props) {
    super(props)
    this.state ={

      dataFromApi:[],
      transactionHash:'',
      ipfsHash:'',
      isLoaded:true
    };

    this.renderWithoutTable = this.renderWithoutTable.bind(this)
    this.renderWithTableAndButton = this.renderWithTableAndButton.bind(this)
    this.renderTableButtonAndIpfsHash =  this.renderTableButtonAndIpfsHash.bind(this)
    this.displayLoader = this.displayLoader.bind(this)
  }

  onChildChanged(jsonArray) {
  this.setState({ dataFromApi: jsonArray })
}
onChildChangedHash(tHash) {
  console.log("Setting hashvalue in Parent component =", tHash)
this.setState({ transactionHash: tHash })
}

displayLoader(value) {
  console.log("Setting loader to", value)
this.setState({ isLoaded: value })
}

handleSubmit = (evt) => {
  console.log("In handlesubmit clickhandler for store in ipfs")
  evt.preventDefault();
  var tranactionHash =this.state.dataFromApi[0]["transactionHash"]
  var urlEndPoint = ServerApi.SearchTransactionGetUrl("TransactionHash",this.state.transactionHash)
  console.log("UrlEndPoint", urlEndPoint)
  this.displayLoader(false)

  ipfs.util.addFromURL(urlEndPoint, (err, result) => {
  if (err) {
    console.log(err)
  }
  if(!err){
    this.setState({ipfsHash:result[0].path})
    this.displayLoader(true)
    ServerApi.UpdateTransactionWithIpfs(this.state.transactionHash,result[0].path)
  }
  console.log("Ipfs upload result", result)
})
  console.log("Uploaded to Ipfs" )
}

 renderWithoutTable() {
   console.log("Rendering Ipfs Form Table")
   return (<div>
     <IpfsForm dataFromApiParent={this.state.dataFromApi}  callbackParent={(newState) => this.onChildChanged(newState)}
callbackSetHash={(tHash) => this.onChildChangedHash(tHash)}  />
     </div>)
 }

 renderWithTableAndButton(){

   return(
     <div>
     <IpfsForm dataFromApiParent={this.state.dataFromApi}  callbackParent={(newState) => this.onChildChanged(newState)} />
     <TransactionTable dataFromApi={this.state.dataFromApi}/>
       <form onSubmit={this.handleSubmit}>
       <button>Store Transaction in IPFS</button>
     </form>
      <Loader loaded={this.state.isLoaded}  className="spinner" />
     </div>
   );
 }
 renderTableButtonAndIpfsHash(){

      return(
        <div>
        <IpfsForm dataFromApiParent={this.state.dataFromApi}  callbackParent={(newState) => this.onChildChanged(newState)} />
        <TransactionTable dataFromApi={this.state.dataFromApi}/>
          <form onSubmit={this.handleSubmit}>
          <button>Store Transaction in IPFS</button>
        </form>
        <Loader loaded={this.state.isLoaded}  className="spinner" />
        <h1>Ipfs Hash: {this.state.ipfsHash} </h1>
        <h2> Verify content at: https://ipfs.io/ipfs/{this.state.ipfsHash}  </h2>
        </div>
      );
 }

render(){
 if(!Array.isArray(this.state.dataFromApi) || !this.state.dataFromApi.length)
 {
   return this.renderWithoutTable();
 }
 else if (!this.state.ipfsHash){
   return this.renderWithTableAndButton();
 } else {
   return this.renderTableButtonAndIpfsHash()
 }
}

}

  export default IpfsFormTable
