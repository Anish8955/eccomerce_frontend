import { Link } from "react-router-dom";
import Layout from "../common/Layout";
import Sidebar from "../common/Sidebar";
import { useEffect, useState } from "react";
import { adminToken, apiUrl } from "../common/http";

const Dashboard = () => {

  const [totalProducts, setTotalProducts] = useState();
  const [totalOrders, setTotalOrders] = useState();
  

     const fetchTotalProduct = async () => {
        const res = await fetch(`${apiUrl}/total-product`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${adminToken()}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            setTotalProducts(result.total_active);
          });
      };

      const fetchTotalOrder = async () => {
        const res = await fetch(`${apiUrl}/total-order`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${adminToken()}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            setTotalOrders(result.total_orders);
          });
      };

      useEffect(() => {
        fetchTotalProduct();
        fetchTotalOrder();
      },[]);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Dashboard</h4>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="row">
              
              <div className="col-md-4">
                <div className="card shadow ">
                  <div className="card-body">
                    <h2>{totalOrders}</h2>
                    <span>Orders</span>
                  </div>
                  <div className="card-footer">
                    <Link  to="/admin/orders">View Orders</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow ">
                  <div className="card-body">
                    <h2>{totalProducts}</h2>
                    <span>Products</span>
                  </div>
                  <div className="card-footer">
                    <Link to="/admin/products">View Products</Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
