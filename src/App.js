import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navigation from './Navigation.js'



import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './css/App.css'

import Main from './Main.js'




const App = () => (
  <div>
  <Navigation/>
  <Main/>
  </div>
)

export default App
