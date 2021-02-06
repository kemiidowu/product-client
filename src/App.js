import React, { Component } from "react";
import "./App.css";
import { Container, Button, Alert } from "react-bootstrap";
import AllProductList from "./../src/components/AllProductList";
import AddProduct from "./../src/components/AddProduct";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddProduct: false,
      error: null,
      response: {},
      product: {},
      isEditProduct: false,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddProduct: true });
  }

  onFormSubmit(data) {
    if (data._id) {
      // console.log("data,", data);
      const apiUrl = `https://protected-journey-12218.herokuapp.com/api/v1/products/${data._id}`;
      const formData = new FormData();
      formData.append("data", data);

      const options = {
        method: "PATCH",
        body: formData,
      };

      fetch(apiUrl, options)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              product: result,
              isAddProduct: false,
              isEditProduct: false,
            });
          },
          (error) => {
            this.setState({ error });
          }
        );
    } else {
      let apiUrl;

      apiUrl = `https://protected-journey-12218.herokuapp.com/api/v1/products/`;
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const options = {
        method: "POST",
        body: JSON.stringify(data),
        myHeaders,
      };
      fetch(apiUrl, options)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              response: result,
              isAddProduct: false,
              isEditProduct: false,
            });
          },
          (error) => {
            this.setState({ error });
          }
        );
    }
  }

  editProduct = (productId) => {
    const apiUrl = `https://protected-journey-12218.herokuapp.com/api/v1/products/${productId}`;

    const options = {
      method: "GET",
    };
    fetch(apiUrl, options)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            product: result,
            isEditProduct: true,
            isAddProduct: true,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
  };

  render() {
    let productForm;
    if (this.state.isAddProduct || this.state.isEditProduct) {
      productForm = (
        <AddProduct
          onFormSubmit={this.onFormSubmit}
          product={this.state.product}
        />
      );
    }

    return (
      <div className="App">
        <Container>
          <h1 style={{ textAlign: "center" }}>Admin</h1>
          {!this.state.isAddProduct && (
            <Button variant="primary" onClick={() => this.onCreate()}>
              Add Product
            </Button>
          )}
          {this.state.response.status === "success" && (
            <div>
              <br />
              <Alert variant="info">{this.state.response.message}</Alert>
            </div>
          )}
          {!this.state.isAddProduct && (
            <AllProductList editProduct={this.editProduct} />
          )}
          {productForm}
          {this.state.error && <div>Error: {this.state.error.message}</div>}
        </Container>
      </div>
    );
  }
}

export default App;
