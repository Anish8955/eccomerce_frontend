import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Shop from "./Components/Shop";
import Product from "./Components/Product";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Login from "./Components/admin/Login";
import { ToastContainer, toast } from "react-toastify";
import Dashboard from "./Components/admin/Dashboard";
import { AdminRequireAuth } from "./Components/admin/AdminRequireAuth";


import { default as ShowCategories } from "./Components/admin/category/Show";
import { default as CreateCategory} from "./Components/admin/category/Create";
import { default as EditCategory } from "./Components/admin/category/Edit";
import { default as ShowBrands } from "./Components/admin/brand/Show";
import { default as CreateBrand} from "./Components/admin/brand/Create";
import { default as EditBrand } from "./Components/admin/brand/Edit";
import { default as ShowProducts } from "./Components/admin/product/Show";
import { default as CreateProduct} from "./Components/admin/product/Create";
import { default as EditProduct } from "./Components/admin/product/Edit";
import Register from "./Components/Register";
import { default as UserLogin } from "./Components/Login";
import Profile from "./Components/Profile";
import { RequireAuth } from "./Components/RequireAuth";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/account/login" element={<UserLogin />} />
        
        
          <Route path="/admin/login" element={<Login />} />
          
    
          <Route path="/account" element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            } />
          



          <Route 
            path="/admin/dashboard"
            element={
              <AdminRequireAuth>
                <Dashboard />
              </AdminRequireAuth>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <AdminRequireAuth>
                <ShowCategories />
              </AdminRequireAuth>
            }
          />

          <Route
            path="/admin/categories/create"
            element={
              <AdminRequireAuth>
                <CreateCategory />
              </AdminRequireAuth>
            }
          />

           <Route
            path="/admin/categories/edit/:id"
            element={
              <AdminRequireAuth>
                <EditCategory />
              </AdminRequireAuth>
            }
          />

           <Route
            path="/admin/brands"
            element={
              <AdminRequireAuth>
                <ShowBrands />
              </AdminRequireAuth>
            }
          />

          <Route
            path="/admin/brands/create"
            element={
              <AdminRequireAuth>
                <CreateBrand />
              </AdminRequireAuth>
            }
          />

           <Route
            path="/admin/brands/edit/:id"
            element={
              <AdminRequireAuth>
                <EditBrand />
              </AdminRequireAuth>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRequireAuth>
                <ShowProducts />
              </AdminRequireAuth>
            }
          />

          <Route
            path="/admin/products/create"
            element={
              <AdminRequireAuth>
                <CreateProduct />
              </AdminRequireAuth>
            }
          />

          <Route
            path="/admin/products/edit/:id"
            element={
              <AdminRequireAuth>
                <EditProduct />
              </AdminRequireAuth>
            }
          />


        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
