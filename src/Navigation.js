import React from "react"
import {Link} from "react-router"
import { NavLink } from 'react-router-dom';

class Navigation extends React.PureComponent {

  render (){
    return (
      <nav>
        <ul>
          <li><NavLink to='/ResourceTransaction'>Resource Details </NavLink></li>
          <li><NavLink to='/IpfsSubmit'>IPFS Transaction</NavLink></li>
          <li><NavLink to='/VerifyInfo'>Verify Information</NavLink></li>

        </ul>
      </nav>
      );
  }

}

export default Navigation
