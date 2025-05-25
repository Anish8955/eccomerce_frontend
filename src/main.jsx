import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.scss'
import { AdminAuthProvider } from './Components/context/AdminAuth.jsx';
import { CartProvider } from './Components/context/Cart.jsx';


createRoot(document.getElementById('root')).render(

  <StrictMode>

    <AdminAuthProvider>
      <CartProvider>
         <App />
      </CartProvider>
    </AdminAuthProvider>
  </StrictMode>,
)
