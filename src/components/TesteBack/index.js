/* Teste de integração com o back-end. */

import React from "react";

export class TesteBack extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    	content: 'Default'
    };
  }
  
  componentDidMount() {
  	fetch('/api/ies')
      .then(res => res.json())
      .then(jsonRes => this.setState(jsonRes));
  }

  render() {
    return (
      <div>
        <h1>{this.state.content}</h1>
      </div>
    );
  }
}
