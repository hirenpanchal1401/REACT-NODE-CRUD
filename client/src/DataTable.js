import React, { Component } from 'react';
import { Table , Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class DataTable extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.getData = this.getData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  getData() {
    axios.get('http://localhost:3001/api/product/list')
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

  render() {
    return (
      <Table>
        <thead>
            <tr>
              <th>ProductName</th>
              <th>ProductId</th>
              <th>Prize</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Modify</th>
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
                <td><Link to='/form'><Button color='primary' onClick={() => { this.props.editData(element) }}>EDIT</Button></Link><Button color='danger'onClick={() => { this.deleteData(element.id) }}>DELETE</Button></td>
              </tr>
            )}
          </tbody>
      </Table>
    );
  }
}

export default DataTable;