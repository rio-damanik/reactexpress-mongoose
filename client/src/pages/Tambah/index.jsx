import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk pengalihan halaman
import Input from "../../components/Input";
import "./index.scss";

const Tambah = (props) => {
  const [nameItem, setNameItem] = useState("");
  const [price, setPrice] = useState(0);
  const [successMessage, setSuccessMessage] = useState(""); // State untuk notifikasi
  const navigate = useNavigate(); // Hook untuk navigasi

  const setItem = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmQzNTY5NmRjYWM3MWMyODhiYTQyOSIsImlhdCI6MTcyNzk1Nzg0OCwiZXhwIjoxNzMwNTQ5ODQ4fQ.mIEGWdJ0BlMuSnldsXV4Ynt3nRM3DHuegu-qdR6D218");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify({
        name: nameItem,
        price: price,
      }),
    };

    fetch("http://localhost:5000/api/products", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setSuccessMessage("Produk berhasil ditambahkan!"); // Set pesan sukses

        // Alihkan ke halaman Home setelah 2 detik
        setTimeout(() => {
          navigate("/"); // Navigasi ke Home
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return false;
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form>
          <Input
            name="name"
            type="text"
            value={nameItem}
            onChange={(e) => {
              setNameItem(e.target.value);
            }}
            placeholder="Nama Produk..."
            label="Nama"
          />
          <Input
            name="price"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            placeholder="Harga Produk..."
            label="Harga"
          />
          <button type="button" onClick={setItem} className="btn btn-primary">
            Simpan
          </button>
        </form>

        {/* Tampilkan pesan sukses jika produk berhasil ditambahkan */}
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      </div>
    </div>
  );
};

export default Tambah;
