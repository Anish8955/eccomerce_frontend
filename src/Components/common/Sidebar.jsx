import { Link } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuth'
import  { useContext } from 'react'

const Sidebar = () => {
    const {logout} = useContext(AdminAuthContext);
  return (
      <div className='card shadow mb-5 sidebar'>
                     <div className='card-body p-4'>
                          <ul>
                            <li>
                              <a href='/admin/dashboard'>Dashboard</a>
                            </li>
                             <li>
                              <Link to='/admin/categories'>Categories</Link>
                            </li>
                             <li>
                              <Link to='/admin/brands'>Brands</Link>
                            </li>
                             <li>
                               <Link to='/admin/products'>Products</Link>
                            </li>
                            <li>
                              <Link to='/admin/orders'>Orders</Link>
                            </li>
                            <li>
                              <Link to='/admin/shipping'>Shipping</Link>
                            </li>
                            <li>
                              <a href='#' onClick={logout}>Logout</a> 
                            </li>
                          </ul>
                     </div>

                  </div>
  )
}

export default Sidebar