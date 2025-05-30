import Sidebar from '../../common/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { adminToken, apiUrl } from "../../common/http";
import Layout from '../../common/Layout'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";


const Edit = () => {

   const [disable, setDisable] = useState(false);
   const [category, setCategory] = useState([]);
  const navigate = useNavigate();
    const params = useParams();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm( {
        defaultValues : async () =>{
            const response = await fetch(`${apiUrl}/categories/${params.id}`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                      Authorization: `Bearer ${adminToken()}`,
                    },
                    
                  });
            
                  const result = await response.json(); 
            
                
            
                  if (result.status === 200) {
                     setCategory(result.data);
                     reset({
                        name: result.data.name,
                        status: result.data.status
                     })
                  } else {
                    toast.error(result.message || "Something went wrong."); // optional error feedback
                  }
        }
    }
  );

  const saveCategory = async (data) => {
    setDisable(true);

    try {
      const response = await fetch(`${apiUrl}/categories/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json(); // ✅ correct usage

      setDisable(false);

      if (result.status === 200) {
        toast.success(result.message || "Category Updated successfully!"); // ✅ show message
        navigate("/admin/categories");
      } else {
        toast.error(result.message || "Something went wrong."); // optional error feedback
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setDisable(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Category / Edit</h4>
            <Link to="/admin/categories" className="btn btn-primary">Back</Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            
         <form onSubmit={handleSubmit(saveCategory)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Name
                    </label>
                    <input
                      {...register("name", {
                        required: "The name field is required",
                      })}
                      type="text"
                      className={`form-control ${errors.name && "is-invalid"}`}
                      placeholder="Enter Name"
                    />
                    {errors.name && (
                      <p className="invalid-feedback">{errors.name?.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Status
                    </label>
                    <select
                      {...register("status", {
                        required: "Please select a status",
                      })}
                      className={`form-control ${
                        errors.status && "is-invalid"
                      }`}
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                    {errors.status && (
                      <p className="invalid-feedback">
                        {errors.status?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button disabled={disable} className="btn btn-primary mt-3">
                Update Category
              </button>
            </form>
               
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Edit