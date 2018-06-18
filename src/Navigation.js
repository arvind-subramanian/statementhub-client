import React from "react"
import {Link} from "react-router"
import { NavLink } from 'react-router-dom';

class Navigation extends React.PureComponent {

  render (){
    return (
      <nav>
        <ul>
          <li><NavLink to='/ResourceTransaction'>Resource Details </NavLink></li>
          <li><NavLink to='/IpfsSubmit'>Upload to IPFS</NavLink></li>
          <li><NavLink to='/VerifyInfo'>Query Transactions Off-Chain</NavLink></li>
          <li><NavLink to='/VerifyOnChain'>Verify Data On-chain</NavLink></li>
        </ul>
      </nav>
      );
  }

}

export default Navigation
