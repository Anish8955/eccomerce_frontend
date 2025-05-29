
import Layout from '../../common/Layout'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';

const Shipping = () => {

    const [disable, setDisable] = useState(false);
     



    const {
        register,
        handleSubmit,
        watch,
         reset,
        formState: { errors },
      } = useForm({

          defaultValues: async () => {

              await fetch(`${apiUrl}/get-shipping`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${adminToken()}`,
            },
          
          })
           .then(res => res.json())
           .then(result =>{
                 
            if(result.status == 200){
                console.log(result.data);
                  reset({
                     shipping_charges: result.data.shipping_charges
                  })
                   
            }else {
                  toast.error(result.message || "Something went wrong."); // optional error feedback
          }
        })
          }
      });
    
      const saveShipping = async (data) => {
         setDisable(true);
    
        
          const res = await fetch(`${apiUrl}/save-shipping`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${adminToken()}`,
            },
            body: JSON.stringify(data),
          })
           .then(res => res.json())
           .then(result =>{
                 setDisable(false);
            if(result.status == 200){
                  toast.success(result.message); // ✅ show message
                   
            }else {
                  toast.error(result.message || "Something went wrong."); // optional error feedback
          }
        })
      }


  return (
     <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Shipping</h4>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-6 ">
            <form onSubmit={handleSubmit(saveShipping)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Shipping Charge
                    </label>
                    <input
                      {...register("shipping_charges", {
                        required: "This field is required",
                      })}
                      type="text"
                      className={`form-control ${errors.shipping_charges && "is-invalid"}`}
                      placeholder="Enter Shipping Charge"
                    />
                    {errors.shipping_charges && (
                      <p className="invalid-feedback">{errors.shipping_charges?.message}</p>
                    )}
                  </div>
                 
                </div>
              </div>
              <button disabled={disable}  className="btn btn-primary mt-3">
                Save Shipping
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Shipping