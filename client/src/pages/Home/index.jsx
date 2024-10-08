import { Link } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 2,
  });

  // Fetch products from API
  const getItem = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmQzNTY5NmRjYWM3MWMyODhiYTQyOSIsImlhdCI6MTcyNzk1Nzg0OCwiZXhwIjoxNzMwNTQ5ODQ4fQ.mIEGWdJ0BlMuSnldsXV4Ynt3nRM3DHuegu-qdR6D218"); // Gunakan token yang sesuai

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/products", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
        setFilteredProducts(res); // Simpan produk untuk filtering
      });
  };

  // Delete a product by ID
  const deleteItem = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmQzNTY5NmRjYWM3MWMyODhiYTQyOSIsImlhdCI6MTcyNzk1Nzg0OCwiZXhwIjoxNzMwNTQ5ODQ4fQ.mIEGWdJ0BlMuSnldsXV4Ynt3nRM3DHuegu-qdR6D218"); // Gunakan token yang sesuai

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:5000/api/products/${id}`, requestOptions)
      .then((res) => res.json())
      .then(() => {
        setProducts(products.filter((product) => product._id !== id));
        setFilteredProducts(filteredProducts.filter((product) => product._id !== id));
      });
  };

  // Search functionality
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = products.filter((item) => item.name.toLowerCase().includes(searchTerm));
    setFilteredProducts(filtered); // Set the filtered products based on search term
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." onChange={handleSearch} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td className="text-right">{rupiah.format(item.price)}</td>
              <td className="text-center">
                <Link to={`/detail/${item._id}`} className="btn btn-sm btn-info">
                  Detail
                </Link>
                <Link to={`/edit/${item._id}`} className="btn btn-sm btn-warning">
                  Edit
                </Link>
                <button onClick={() => deleteItem(item._id)} className="btn btn-sm btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
