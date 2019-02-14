import React, { Component } from 'react';
import { Table , Button , Form, FormGroup, Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class DataTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search : '',
      skip : 0
    }
    this.getData = this.getData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.handleSearch=this.handleSearch.bind(this);
    this.handleNext=this.handleNext.bind(this);
    this.handlePrev=this.handlePrev.bind(this);
  }

  getData() {
    axios.get('http://localhost:3001/api/product/list?search='+this.state.search+'&skip='+this.state.skip)
      .then((res) => {
        let data = res.data.data;
        this.props.updateData(data)
      })
      .catch(err => console.log)
  }

  deleteData(id) {
    console.log(id)
    axios.delete('http://localhost:3001/api/product/' + id + '/delete')
      .then(() => {
        console.log('deleted')
        this.getData();
      }).catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    this.getData()
  }

  handleSearch(e){
    this.setState({ search: e.target.value});
    
  }

  handleNext(){
      let x = this.state.skip + 5;
      if(x<=this.props.data.length){
        this.setState({ skip : x});
        this.getData();
      }
      console.log(this.state.skip);
  }

  handlePrev(){
    let x = this.state.skip - 5;
    if(x>=0){
      this.setState({ skip : x});
      this.getData();
    }
    console.log(this.state.skip);
  }

  render() {
    return (
    <>
      <Form>
          <FormGroup>
            <Input type="search" id="psearch" value={this.state.search} placeholder='Search Product Name Here. . .' onChange={(e)=>{this.handleSearch(e)}}/>
          </FormGroup>
      </Form>
      <Table>
        <thead>
            <tr>
              <th>ProductName</th>
              <th>ProductId</th>
              <th>Prize</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(element =>
              <tr key={element.id}>
                <td>{element.productName}</td>
                <td>{element.productId}</td>
                <td>{element.prize}</td>
                <td>{element.quantity}</td>
                <td>{element.totalAmount}</td>
                <td><Link to='/form'><Button color='primary' onClick={() => { this.props.editData(element) }}>EDIT</Button></Link></td>
                <td><Button color='danger'onClick={() => { this.deleteData(element.id) }}>DELETE</Button></td>
              </tr>
            )}
          </tbody>
      </Table>
      <Button onClick={()=>this.handlePrev()}>Prev</Button>&nbsp;<Button onClick={()=>this.handleNext()}>Next</Button>
    </>
    );
  }
}

export default DataTable;