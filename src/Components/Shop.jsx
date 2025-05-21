import React from "react";
import Layout from "./common/Layout";
import ProductImg from "../assets/images/eight.jpg";
import { Link } from "react-router-dom";


const Shop = () => {
  return (
    <>
      <Layout>
        <div className="container">
          <nav aria-label="breadcrumb" className="py-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>  
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Shop
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-md-3">
              <div className="card shadow border-0">
                 <div className="card-body p-4">
                     <h3>Categories</h3>
                     <ul>
                      <li className="mt-2">
                        <input type="checkbox" />
                        <label className="ps-2" htmlFor="">Kids</label>
                      </li>
                       <li className="mt-2">
                        <input type="checkbox" />
                        <label className="ps-2" htmlFor="">Mens</label>
                      </li>
                       <li className="mt-2">
                        <input type="checkbox" />
                        <label className="ps-2" htmlFor="">Women</label>
                      </li>
                     </ul>
                 </div>
              </div>

               <div className="card shadow border-0 mt-5 mb-5">
                 <div className="card-body p-4">
                     <h3>Brands</h3>
                     <ul>
                      <li className="mt-2">
                        <input type="checkbox" />
                        <label className="ps-2" htmlFor="">Mama Earth</label>
                      </li>
                       <li className="mt-2">
                        <input type="checkbox" />
                        <label className="ps-2" htmlFor="">Puma</label>
                      </li>
                       <li className="mt-2">
                        <input type="checkbox" />
                        <label className="ps-2" htmlFor="">Nike</label>
                      </li>
                      <li className="mt-2">
                        <input type="checkbox" />
                        <label className="ps-2" htmlFor="">Levis</label>
                      </li>
                      <li className="mt-2">
                        <input type="checkbox" />
                        <label className="ps-2" htmlFor="">Red Tap</label>
                      </li>
                      <li className="mt-2">
                        <input type="checkbox" />
                        <label className="ps-2" htmlFor="">Killer</label>
                      </li>
                     </ul>
                 </div>
              </div>

            </div>
            <div className="col-md-9">
              <div className="row pb-5">
                   <div className="col-md-3 col-6">
                                   <div className="product card border-0">
                                       <div className="card-img">
                                        <Link to="/product">
                                          <img src={ProductImg} className="w-100" />
                                        </Link>
                                          
                                       </div>
                                       <div className="card-body pt-3">
                                             <Link to="/product">Red Check Shirt For Men</Link>
                                             <div className="price">
                                                 $50 <span className="text-decoration-line-through">$80</span>
                                             </div>
                                       </div>
                                   </div>
                                </div>
                                 <div className="col-md-3 col-6">
                                   <div className="product card border-0">
                                       <div className="card-img">
                                            <img src={ProductImg} className="w-100" />
                                       </div>
                                       <div className="card-body pt-3">
                                             <a href="">Red Check Shirt For Men</a>
                                             <div className="price">
                                                 $50 <span className="text-decoration-line-through">$80</span>
                                             </div>
                                       </div>
                                   </div>
                                </div>
                                 <div className="col-md-3 col-6">
                                   <div className="product card border-0">
                                       <div className="card-img">
                                            <img src={ProductImg} className="w-100" />
                                       </div>
                                       <div className="card-body pt-3">
                                             <a href="">Red Check Shirt For Men</a>
                                             <div className="price">
                                                 $50 <span className="text-decoration-line-through">$80</span>
                                             </div>
                                       </div>
                                   </div>
                                </div>
                                 
                                 <div className="col-md-3 col-6">
                                   <div className="product card border-0">
                                       <div className="card-img">
                                            <img src={ProductImg} className="w-100" />
                                       </div>
                                       <div className="card-body pt-3">
                                             <a href="">Red Check Shirt For Men</a>
                                             <div className="price">
                                                 $50 <span className="text-decoration-line-through">$80</span>
                                             </div>
                                       </div>
                                   </div>
                                </div>
                                <div className="col-md-3 col-6">
                                   <div className="product card border-0">
                                       <div className="card-img">
                                            <img src={ProductImg} className="w-100" />
                                       </div>
                                       <div className="card-body pt-3">
                                             <a href="">Red Check Shirt For Men</a>
                                             <div className="price">
                                                 $50 <span className="text-decoration-line-through">$80</span>
                                             </div>
                                       </div>
                                   </div>
                                </div>
                                <div className="col-md-3 col-6">
                                   <div className="product card border-0">
                                       <div className="card-img">
                                            <img src={ProductImg} className="w-100" />
                                       </div>
                                       <div className="card-body pt-3">
                                             <a href="">Red Check Shirt For Men</a>
                                             <div className="price">
                                                 $50 <span className="text-decoration-line-through">$80</span>
                                             </div>
                                       </div>
                                   </div>
                                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Shop;
