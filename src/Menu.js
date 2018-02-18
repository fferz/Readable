import React, { Component } from 'react';
import './App.css';

class Menu extends Component {
  state = {
    categories : []
  }

  componentDidMount(){
    fetch('/categories',
      {
        headers: { 'Authorization': 'fercategories' }
      }
    )
      .then(res => res.json())
      .then(categories => this.setState({ categories }))
  }
  render() {
      var i =1
    return (
        <div className="sidenav">
            {this.state.categories.map( category =>
                <div key={i}> 
                    <a href="#">{category.name}</a>
                    {i = i++}
                </div>)}
        </div>
    );
  }
}

export default Menu;