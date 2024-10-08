import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import "./index.scss";

const Detail = () => {
  const { id } = useParams(); // Ambil ID produk dari URL
  const [product, setProduct] = useState(null); // State untuk menyimpan data produk
  const [error, setError] = useState(null); // State untuk menyimpan error jika ada
  const [loading, setLoading] = useState(true); // State untuk loading

  // Fungsi untuk mendapatkan detail produk berdasarkan ID
  const getItemDetail = useCallback(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmQzNTY5NmRjYWM3MWMyODhiYTQyOSIsImlhdCI6MTcyNzk1Nzg0OCwiZXhwIjoxNzMwNTQ5ODQ4fQ.mIEGWdJ0BlMuSnldsXV4Ynt3nRM3DHuegu-qdR6D218"); // Token otorisasi
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    setError(null);
    setLoading(true);

    fetch(`http://localhost:5000/api/products/${id}`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Product not found");
          } else {
            throw new Error(`Error: ${res.statusText}`);
          }
        }
        return res.json();
      })
      .then((res) => {
        setProduct(res); // Set data produk ke state
      })
      .catch((error) => {
        setError(error.message); // Set pesan error jika terjadi
      })
      .finally(() => {
        setLoading(false); // Set loading selesai
      });
  }, [id]);

  // Gunakan useEffect untuk mengambil data produk saat komponen dimount
  useEffect(() => {
    getItemDetail();
  }, [getItemDetail]);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Jika produk tidak ditemukan
  if (!product) {
    return <div>No product found.</div>;
  }

  // Tampilan detail produk
  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>
      <table className="table">
        <tbody>
          <tr>
            <td>Name</td>
            <td>: {product.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp. {product.price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Detail;
