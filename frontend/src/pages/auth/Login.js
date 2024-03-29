import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "./authStyle.css";
import { useAuth } from "../../context/Auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  //   create handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        {
          email,
          password,
        }
      );
      // console.log(res.data.user.name);
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
        toast.success(res.data && res.data.message);
      } else {
        toast.error("something is wrong");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Register - Ecommerce app"}>
      <div className="container-fluid p-3 dashboard">
        <div className="form-container" style={{ marginTop: "70px" }}>
          <form onSubmit={handleSubmit}>
            <h1 className="title">Login Page</h1>

            <div className="mb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail"
                placeholder="Email"
                required
              />
            </div>

            <div className="mb-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ paddingLeft: "100px" }}
            >
              Submit
            </button>
            <div className="mt-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate("/forgot-password")}
                style={{ paddingLeft: "70px" }}
              >
                Forgot Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
