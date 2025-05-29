import React, { useEffect, useState } from 'react'
import Layout from './common/Layout'
import { Link, useParams } from 'react-router-dom'
import UserSidebar from './common/UserSidebar'
import { apiUrl, userToken } from './common/http'

const Profile = () => {

  const [totalOrders , setTotalOrders] = useState();
  const { id } = useParams();

  const fetchTotalOrder = async () => {
            const res = await fetch(`${apiUrl}/user/${id}/total-orders`, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${userToken()}`,
            },
          })
            .then((res) => res.json())
            .then((result) => {
              setTotalOrders(result.total_orders);
            });
        };
  
        useEffect(() => {
          
          fetchTotalOrder();
        },[]);
  

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">My Profile</h4>
            {/* <Link to="" className="btn btn-primary">Button</Link> */}
          </div>
          <div className="col-md-3">
            <UserSidebar />
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
                    <Link to="/account/orders">View Orders</Link>
                  </div>
                </div>
              </div>
              

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile