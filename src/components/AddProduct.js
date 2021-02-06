import React from "react";
import { Row, Form, Col, Button } from "react-bootstrap";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      _id: "",
      name: "",
      description: "",
      categories: "",
      price: "",
      sale_price: "",
      images: "",
    };
    console.log("props", props);
    if (props && props.product && props.product.data) {
      this.state = props.product.data.products;
    } else {
      this.state = this.initialState;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    console.log("this.state", this.state);
    event.preventDefault();
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  }

  render() {
    let pageTitle;
    if (this.state && this.state._id) {
      pageTitle = <h2>Edit Product</h2>;
    } else {
      pageTitle = <h2>Add Product</h2>;
    }

    return (
      <div>
        {pageTitle}
        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="product name"
                />
              </Form.Group>
              <Form.Group controlId="categories">
                <Form.Label>Categories</Form.Label>
                <Form.Control
                  type="text"
                  name="categories"
                  value={this.state.categories}
                  onChange={this.handleChange}
                  placeholder="categories"
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  placeholder="description"
                />
              </Form.Group>
              <Form.Group controlId="images">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  name="images"
                  value={this.state.images}
                  onChange={this.handleChange}
                  placeholder="image"
                />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                  placeholder="Price"
                />
              </Form.Group>

              <Form.Group controlId="sale_price">
                <Form.Label>Sale Price</Form.Label>
                <Form.Control
                  type="number"
                  name="sale_price"
                  value={this.state.sale_price}
                  onChange={this.handleChange}
                  placeholder="sale_price"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control type="hidden" name="id" value={this.state._id} />
                <Button variant="success" type="submit">
                  Save
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddProduct;
