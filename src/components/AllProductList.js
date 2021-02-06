// import React, { useState } from "react";
// import { Table, Button, Alert } from "react-bootstrap";
// import useProducts from "../custom-hooks/useProductDetails";

// const AllProductList = () => {
//   const [errorMessage, setErrorMessage] = useState("null");
//   const [products, setProduct] = useState("null");
//   const [response, setResponse] = useState("null");
//   const { data, status, error } = useProducts();
//   const onSubmit = async (data) => {
//   //    const { currentPassword, newPassword, newPasswordAgain } = data;
//   //    setLoading(true);
//   //    setError(null);
//   //    const reqBody = {
//   //      old_password: currentPassword,
//   //      password1: newPassword,
//   //      password2: newPasswordAgain,
//   //    };
//   //    try {
//   //      await postData(ajaxEndpoints.CHANGE_PASSWORD, reqBody);
//   //      setLoading(false);
//   //      setSuccess(
//   //        "You password has been changed successfully. You will be required to log in again"
//   //      );
//   //      setTimeout(() => {
//   //        history.push("/logout");
//   //      }, 5000);
//   //    } catch (error) {
//   //      setLoading(false);
//   //      setError(errorHandler(error));
//   //    }
//   //  };
//   return (
//     <div>
//       <h2>Product List</h2>
//       {response.message && <Alert variant="info">{response.message}</Alert>}
//       <Table>
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Product _id</th>
//             <th>Product Name</th>
//             <th>categories</th>
//             <th>description</th>
//             <th>Price</th>
//             <th>sale price</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.images}>
//               <td>{product.name}</td>
//               <td>{product.categories}</td>
//               <td>{product.description}</td>
//               <td>{product.price}</td>
//               <td>{product.sale_price}</td>
//               <td>
//                 <Button
//                   variant="info"
//                   // onClick={() =>editProduct(product._id)}
//                 >
//                   Edit
//                 </Button>
//                 &nbsp;
//                 <Button
//                   variant="danger"
//                   // onClick={() => deleteProduct(product._id)}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default AllProductList;

import React from "react";
import { Table, Button, Alert } from "react-bootstrap";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      products: [],
      response: {},
    };
  }

  componentDidMount() {
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://protected-journey-12218.herokuapp.com/api/v1/products`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result", result);
          this.setState({
            products: result.data.products,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

  deleteProduct(productId) {
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://protected-journey-12218.herokuapp.com/api/v1/products/${productId}`;

    const options = {
      method: "DELETE",
    };

    fetch(apiUrl, options)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("deleted result", result);
          this.setState({
            response: "successfully deleted ",
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

  render() {
    const { error, products } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          <h2>Product List</h2>
          {this.state.response.message && (
            <Alert variant="info">{this.state.response.message}</Alert>
          )}
          <Table>
            <thead>
              <tr>
                {/* <th>Image</th> */}
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Categories</th>
                <th>Description</th>
                <th>Price</th>
                <th>sale price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.categories || ""}</td>
                    <td>{product.description || ""}</td>
                    <td>{product.price || ""}</td>
                    <td>{product.sale_price || ""}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => {
                          this.props.editProduct(product._id);
                        }}
                      >
                        Edit
                      </Button>
                      &nbsp;
                      <Button
                        variant="danger"
                        onClick={() => this.deleteProduct(product._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      );
    }
  }
}

export default ProductList;
