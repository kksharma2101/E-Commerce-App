import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //   get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product/single-product/${params.slug}`
      );
      setCategory(data?.product.category._id);
      setId(data.product._id);
      setName(data?.product.name);
      setDescription(data?.product.description);
      setPrice(data?.product.price);
      setQuantity(data?.product.quantity);
      setShipping(data?.product.shipping);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // handle Create
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Error in product created");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // handleDelete
  const handleDelete = async () => {
    try {
      const answer = window.prompt("Are sure");
      if (!answer) return;
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/product/delete-product/${id}`
      );
      toast.success("Product deleted successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid p-3 dashboard">
        <div className="row" style={{ marginTop: "70px" }}>
          <div className="col-md-3">{<AdminMenu />}</div>
          <div className="col-md-9">
            <h2>Update Product</h2>
            <div className="m-1 w-75">
              {/* <form onSubmit={handleCreate}> */}
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select p-0 mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/api/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  size="large"
                  value={shipping ? "Yes" : "No"}
                  placeholder="Select shipping"
                  // showSearch
                  className="form-select p-0"
                  onChange={(value) => setShipping(value)}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Update Product
                </button>
                <button
                  type="submit"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete Product
                </button>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
