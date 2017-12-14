import React from 'react'
import { Component } from 'react'

class Shelve extends Component {
  
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <p>The {this.props.name} books will be here</p>
      </div>
    )
  }
}

export default Shelve
