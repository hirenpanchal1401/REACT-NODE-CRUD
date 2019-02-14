import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';

class Form1 extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.insertData = this.insertData.bind(this);
  }
  insertData(e) {
    e.preventDefault();
    if (this.props.flag === true) {
      axios.put('http://localhost:3001/api/product/' + this.props.id + '/edit', this.props.formData)
        .then((res) => {
          console.log(res)
          this.props.updateState()
          this.props.history.push('/');
        }).catch((err) => {
          console.log(err)
        })
    } else {
      axios.post('http://localhost:3001/api/product/create', this.props.formData)
        .then((res) => {
          console.log(res)
          this.props.updateformData()
          this.props.history.push('/');
        }).catch((err) => {
          console.log(err)
        })
    }
  }

  render() {
    return (
      <Form>
        <FormGroup>
            <Label for='pName'>Product Name:</Label>
            <Input type="text" required id="pName" value={this.props.formData.productName} placeholder='Enter Product Name' onChange={(e) => { this.props.handleChange(e, 'formData', 'productName') }}/>
        </FormGroup>
        <FormGroup>
            <Label for='pId'>Product Id:</Label>
            <Input type="text" required id="pId" value={this.props.formData.productId} placeholder='Enter Product ID' onChange={(e) => { this.props.handleChange(e, 'formData', 'productId') }}/>
        </FormGroup>
        <FormGroup>
            <Label for='prize'>Prize:</Label>
            <Input type="text" required id="prize" value={this.props.formData.prize} placeholder='Enter Product Prize' onChange={(e) => { this.props.handleChange(e, 'formData', 'prize') }}/>
        </FormGroup>
        <FormGroup>
            <Label for='quantity'>Quantity:</Label>
            <Input type="text" required id="quantity" value={this.props.formData.quantity} placeholder='Enter Product Quantity' onChange={(e) => { this.props.handleChange(e, 'formData', 'quantity') }}/>
        </FormGroup>
        <Button onClick={(e) => this.insertData(e)}>SUBMIT</Button>
      </Form>
    );
  }

}

export default Form1;