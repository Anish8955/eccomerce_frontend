import React, { useContext } from "react";
import Layout from "./common/Layout";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "./common/http";
import { toast } from "react-toastify";
import { AuthContext } from "./context/Auth";

const Login = () => {

    


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

   const {login} = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {

          const userInfo = {
            token: result.token,
            id: result.id,
            name: result.name,
          };

          localStorage.setItem("userInfo", JSON.stringify(userInfo));

          login(userInfo);

          navigate("/account");
        } else {
         
         toast.error(result.message);
        
        }
      });
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card shadow border-0 login">
            <div className="card-body p-4">
              <h3 className="border-bottom pb-2 mb-3">
                <strong>Login</strong>
              </h3>

              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "The email field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="text"
                  className={`form-control ${errors.email && "is-invalid"}`}
                  placeholder="Enter Email"
                />

                {errors.email && (
                  <p className="invalid-feedback">{errors.email?.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "The Password field is required.",
                  })}
                  type="password"
                  className={`form-control ${errors.password && "is-invalid"}`}
                  placeholder="Enter Password"
                />
                {errors.password && (
                  <p className="invalid-feedback">{errors.password?.message}</p>
                )}
              </div>
              <button className="btn btn-primary w-100">Login</button>
              <div className="d-flex pt-4 pb-2 justify-content-center">
                New User? &nbsp; <Link to="/account/register">Register</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
