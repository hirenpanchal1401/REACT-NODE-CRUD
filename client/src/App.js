import React, { Component } from 'react';
import Form1 from './Form';
import DataTable from './DataTable';
import Navbar1 from './Navbar'
import { BrowserRouter as Router, Route } from 'react-router-dom'

let formData = {
  productName: '',
  productId: '',
  prize: '',
  quantity: ''
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      formData: { ...formData },
      flag: false,
      id: ''
    }
    this.updateData = this.updateData.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateformData = this.updateformData.bind(this);
    this.editData = this.editData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updateData(data) {
    this.setState({ data })
  }

  updateformData() {
    this.setState({ formData: { ...formData } })
  }

  updateState() {
    this.setState({ flag: false, formData: { ...formData }, id: '' })
  }





  editData(element) {
    console.log(element.productName)
    const formData1 = {
      productName: element.productName,
      productId: element.productId,
      prize: element.prize,
      quantity: element.quantity
    }
    this.setState({ formData: formData1, flag: true, id: element.id })
    
  }

  handleChange(e, target, field) {
    e.preventDefault();
    const temp = { ...this.state[target] };
    temp[field] = e.target.value;
    this.setState({ [target]: temp })
  }

  render() {
    return (
        <Router>
          <div>
            <Navbar1 />
            <Route exact path='/' render={(props)=><DataTable {...props} {...this.state} updateData={this.updateData} editData={this.editData} />}/>
            <Route path='/form' render={(props)=><Form1 {...props} {...this.state} updateState={this.updateState} updateformData={this.updateformData} handleChange={this.handleChange}/>}/>
          </div>
        </Router>
    );
  }
}

export default App;
