import { useEffect } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";

const Create = ({ placeholder }) => {
  
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sizesChecked, setSizesChecked] = useState([]);
  

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );



  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();




  const saveProduct = async (data) => {

    const formData = {...data, "description": content, "gallery": gallery}
   
    setDisable(true);

    try {
      const response = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json(); // ✅ correct usage

      setDisable(false);

      if (result.status === 200) {
        toast.success(result.message || "Product created successfully!"); // ✅ show message
        navigate("/admin/products");
      } else {
        const formErrors = result.errors;
          Object.keys(formErrors).forEach((field) => {
              setError(field, { message: formErrors[field][0]});
          })
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setDisable(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/categories`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setCategories(result.data);
      });
  };

  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/brands`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setBrands(result.data);
      });
  };

    const fetchSizes  = async () => {
    const res = await fetch(`${apiUrl}/sizes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setSizes(result.data);
      });
  };


  const handleFile= async(e) =>{
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image",file);
    setDisable(true);

     const res = await fetch(`${apiUrl}/temp-images`, {
      method: "POST",
      headers: {
        'Accept': "application/json",
        'Authorization': `Bearer ${adminToken()}`,
      },
      body: formData
    })
      .then((res) => res.json())
      .then((result) => {
       gallery.push(result.data.id);
       setGallery(gallery)

       galleryImages.push(result.data.image_url);
       setGalleryImages(galleryImages);

       setDisable(false);
       e.target.value = ""
      });

  }

  const deleteImage = (image) =>{
     if(confirm("Are you sure want to delete this picture")){
      const  newGallery =  galleryImages.filter(gallery => gallery != image)
      setGalleryImages(newGallery );
     }
  }

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchSizes();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Products / Create</h4>
            <Link to="/admin/products" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveProduct)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Title
                    </label>
                    <input
                      {...register("title", {
                        required: "The title field is required",
                      })}
                      type="text"
                      className={`form-control ${errors.title && "is-invalid"}`}
                      placeholder="Title"
                    />
                    {errors.title && (
                      <p className="invalid-feedback">
                        {errors.title?.message}
                      </p>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="">
                          Category
                        </label>
                        <select
                          {...register("category", {
                            required: "Please select a category",
                          })}
                          className={`form-control ${
                            errors.category && "is-invalid"
                          }`}
                        >
                          <option value="">Select Category</option>
                          {categories &&
                            categories.map((category) => {
                              return (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              );
                            })}
                        </select>
                        {errors.category && (
                          <p className="invalid-feedback">
                            {errors.category?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="">
                          Brand
                        </label>
                        <select
                        {
                            ...register('brand')
                        }
                        className="form-control">
                          <option value="">Select Brand</option>
                          {brands &&
                            brands.map((brand) => {
                              return (
                                <option key={brand.id} value={brand.id}>
                                  {brand.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Short Description
                    </label>
                    <textarea
                    {
                        ...register('short_description')
                    }
                      className="form-control"
                      placeholder="Short Description"
                      rows={3}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Description
                    </label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    />
                  </div>
                  <h3 className="py-3 border-bottom mb-3">Pricing</h3>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor=""
                          className="form-label"
                        >
                          Price
                        </label>
                        <input
                          {...register("price", {
                            required: "The price field is required",
                          })}
                          type="text"
                          placeholder="Price"
                          className={`form-control ${
                            errors.price && "is-invalid"
                          }`}
                        />
                        {errors.price && (
                          <p className="invalid-feedback">
                            {errors.price?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Compare Price
                        </label>
                        <input
                        {
                        ...register('compare_price')
                    }
                          type="text"
                          placeholder="Compare Price"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <h3 className="py-3 border-bottom mb-3">Inventory</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Sku
                        </label>
                        <input
                          {...register("sku", {
                            required: "The sku field is required",
                          })}
                          type="text"
                          placeholder="Sku"
                          className={`form-control ${
                            errors.sku && "is-invalid"
                          }`}
                        />
                        {errors.sku && (
                          <p className="invalid-feedback">
                            {errors.sku?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Barcode
                        </label>
                        <input
                        {
                        ...register('barcode')
                    }
                          type="text"
                          placeholder="Barcode"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Quantity
                        </label>
                        <input
                        {
                            ...register('qty')
                        }
                          type="text"
                          placeholder="Quantity"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
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

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Featured
                    </label>
                    <select
                      {...register("is_featured", {
                        required: "This field is required",
                      })}
                      className={`form-control ${
                        errors.is_featured && "is-invalid"
                      }`}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    {errors.is_featured && (
                      <p className="invalid-feedback">
                        {errors.is_featured?.message}
                      </p>
                    )}
                  </div>

                  <h3 className="py-3 border-bottom mb-3">Sizes</h3>


                  <div className="mb-3">
                   
                    {
                     sizes &&
                      sizes.map((size) => {
                        return (
                          <div className="form-check-inline ps-3" key={`psize-${size.id}`}>  
                            <input
                            {
                              ...register("sizes")
                            }
                              checked={sizesChecked.includes(size.id)}
                              onChange={(e) =>{
                                if(e.target.checked){
                                     setSizesChecked([...sizesChecked,size.id])
                                }else{
                                     setSizesChecked(sizesChecked.filter(sid =>size.id != sid))
                                }
                              }}
                              className="form-check-input "
                              type="checkbox"
                              value={size.id}
                              id={`size-{size.id}`}
                            />
                            <label
                              className="form-check-label ps-2"
                              htmlFor="{`size-{size.id}`}"
                            >
                              {size.name}
                            </label>
                          </div>
                        );
                      })}
                  </div>

                  <h3 className="py-3 border-bottom mb-3">Gallery</h3>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Image
                    </label>
                    <input
                    onChange={handleFile}
                    type="file" className="form-control" />
                  </div>

                   <div className="mb-3">
                       <div className="row">
                            {
                              galleryImages && galleryImages.map((image,index) =>{
                                return (
                                    <div className="col-md-3" key={`image-${index}`}>
                                            <div className="card-shadow">
                                                 <img src={image} className="w-100" />
                                                 <button className="btn btn-danger mt-3" onClick={ () => deleteImage(image)}>Delete</button>
                                            </div>
                                     </div>
                                )
                              })
                            }
                       </div>
                   </div>

                </div>
              </div>
              <button disabled={disable} className="btn btn-primary mt-3 mb-3">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
