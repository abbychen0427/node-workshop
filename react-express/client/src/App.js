import React, {useState, useEffect} from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:5000/product').then((response) => {
      setProducts(response.data);
    })
  }, []) 
  return (
    <>
    <div className="box">
      <table className="product-table">
        <thead>
          <tr>
            <td>product id</td>
            <td>product name</td>
            <td>product price</td>
          </tr>
        </thead>
        <tbody>
          {products.map((v,i) => {
            return (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>NT {v.price}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
      
    </>
  );
}

export default App;