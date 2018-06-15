import React from "react"
import { NavLink, Switch, Route } from 'react-router-dom';
import ResourceTransaction from './ResourceTransaction'
import VerifyInfo from './VerifyInfo'
import FormTable from './FormTable'
import IpfsFormTable from './IpfsFormTable'

const Main = () => (
  <main>
      <Switch>
     <Route exact path='/' component= {ResourceTransaction}></Route>
     <Route exact path='/ResourceTransaction/' component={ResourceTransaction}></Route>
     <Route exact path='/VerifyInfo/' component={FormTable}></Route>
     <Route exact path='/IpfsSubmit/' component={IpfsFormTable}></Route>

   </Switch>
   </main>
)
export default Main
