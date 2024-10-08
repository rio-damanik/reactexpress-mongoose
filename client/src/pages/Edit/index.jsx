import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../components/Input";

const Edit = () => {
  const { id } = useParams(); // Dapatkan ID produk dari URL
  const navigate = useNavigate();
  const [nameItem, setNameItem] = useState("");
  const [price, setPrice] = useState(0);
  const [successMessage, setSuccessMessage] = useState(""); // State untuk notifikasi

  useEffect(() => {
    const getItemDetail = () => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmQzNTY5NmRjYWM3MWMyODhiYTQyOSIsImlhdCI6MTcyNzk1Nzg0OCwiZXhwIjoxNzMwNTQ5ODQ4fQ.mIEGWdJ0BlMuSnldsXV4Ynt3nRM3DHuegu-qdR6D218");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`http://localhost:5000/api/products/${id}`, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          setNameItem(res.name);
          setPrice(res.price);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    };

    getItemDetail();
  }, [id]);

  const updateItem = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmQzNTY5NmRjYWM3MWMyODhiYTQyOSIsImlhdCI6MTcyNzk1Nzg0OCwiZXhwIjoxNzMwNTQ5ODQ4fQ.mIEGWdJ0BlMuSnldsXV4Ynt3nRM3DHuegu-qdR6D218");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        name: nameItem,
        price: price,
      }),
      redirect: "follow",
    };

    fetch(`http://localhost:5000/api/products/${id}`, requestOptions)
      .then((res) => res.json())
      .then(() => {
        setSuccessMessage("Produk berhasil diubah!"); // Set pesan sukses

        // Alihkan ke halaman Home setelah 2 detik
        setTimeout(() => {
          navigate("/"); // Navigasi ke Home
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form>
          <Input
            name="name"
            type="text"
            placeholder={`Nama Produk: ${nameItem}`} // Menampilkan nama produk yang sedang diedit
            label="Nama"
            value={nameItem}
            onChange={(e) => setNameItem(e.target.value)}
          />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={price} onChange={(e) => setPrice(e.target.value)} />
          <button type="button" onClick={updateItem} className="btn btn-primary">
            Simpan
          </button>
        </form>

        {/* Tampilkan pesan sukses jika produk berhasil diubah */}
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      </div>
    </div>
  );
};

export default Edit;
