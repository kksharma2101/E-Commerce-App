import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../src/styles/CategoryProducts.css";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();

  //   get category by product
  const getCategoryByProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product/category-product/${params.slug}`
      );
      if (data?.success) {
        setProducts(data?.product);
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getCategoryByProduct();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container-fluid p-3 dashboard">
        <div className="row" style={{ marginTop: "60px" }}>
          <h2 className="text-center mt-2">Category - {category?.name}</h2>
          <div className="d-flex flex-wrap justify-content-center mt-5">
            {products?.map((pro) => (
              <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={pro._id}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL}/api/product/product-photo/${pro._id}`}
                  class="card-img-top"
                  alt={pro.name}
                />
                <div className="card-body">
                  <h3>{pro.name}</h3>
                  <h3>$ {pro.price}</h3>
                  <p className="card-text">
                    {pro.description.substring(0, 30)}...
                  </p>
                  <div className="btn">
                    <button
                      href="#"
                      class="btn btn-primary ms-2"
                      onClick={() =>
                        navigate(
                          `${process.env.REACT_APP_API_URL}/product/${pro.slug}`
                        )
                      }
                    >
                      More Details
                    </button>
                    <button href="#" class="btn btn-secondary ms-2">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
