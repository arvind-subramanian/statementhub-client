import React from "react"
import { NavLink, Switch, Route } from 'react-router-dom';
import ResourceTransaction from './ResourceSubmit/ResourceTransaction'
import VerifyInfo from './OffChainQuery/VerifyInfo'
import FormTable from './OffChainQuery/FormTable'
import IpfsFormTable from './IpfsUpload/IpfsFormTable'
import VerifyOnChain from './OnChainVerify/VerifyOnChain'
import OnChainDataOuter from './OnChainVerify/OnChainDataOuter'

const Main = () => (
  <main>
      <Switch>
     <Route exact path='/' component= {ResourceTransaction}></Route>
     <Route exact path='/ResourceTransaction/' component={ResourceTransaction}></Route>
     <Route exact path='/VerifyInfo/' component={FormTable}></Route>
     <Route exact path='/IpfsSubmit/' component={IpfsFormTable}></Route>
     <Route exact path='/VerifyOnChain/' component={ OnChainDataOuter }></Route>


   </Switch>
   </main>
)
export default Main
