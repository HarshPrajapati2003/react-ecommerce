import React, { useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { createProductAsync, selectBrands, selectCategories,fetchProductsByIdAsync, selectProductById, updateProductAsync, clearSelectedProduct } from "../../product/ProductSlice";
import Modal from "../../common/Modal";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useAlert } from "react-alert";

const colors =  [
  { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' ,id:'white'},
  { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' ,id:'gray'},
  { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' ,id:'black'},
]

const sizes = [
  { name: 'XXS', inStock: true,id:"xxs" },
  { name: 'XS', inStock: true,id:"xs" },
  { name: 'S', inStock: true,id:"s" },
  { name: 'M', inStock: true,id:"m" },
  { name: 'L', inStock: true,id:"l" },
  { name: 'XL', inStock: true,id:"xl" },
  { name: '2XL', inStock: true,id:"2xl" },
  { name: '3XL', inStock: true,id:"3xl" },
]

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch()
  const params = useParams()
  const selectedProduct = useSelector(selectProductById)
  const [openModal,setOpenModal]=useState(null)
  const alert = useAlert()

  useEffect(()=>{
    if(params.id){
        dispatch(fetchProductsByIdAsync(params.id))
        window.scrollTo({ top: 0, left: 0 });
    }else{
        dispatch(clearSelectedProduct())
        reset()
        window.scrollTo({ top: 0, left: 0 });
    } 
  },[params.id,dispatch])

  useEffect(()=>{
    if(selectedProduct && params.id){
        setValue("title",selectedProduct.title)
        setValue("description",selectedProduct.description)
        setValue("price",selectedProduct.price)
        setValue("discountPercentage",selectedProduct.discountPercentage)
        setValue("rating",selectedProduct.rating)
        setValue("stock",selectedProduct.stock)
        setValue("brand",selectedProduct.brand)
        setValue("category",selectedProduct.category)
        setValue("thumbnail",selectedProduct.thumbnail)
        setValue("image1",selectedProduct.images[0])
        setValue("image2",selectedProduct.images[1])
        setValue("image3",selectedProduct.images[2])
        setValue("highlight1",selectedProduct.highlights[0])
        setValue("highlight2",selectedProduct.highlights[1])
        setValue("highlight3",selectedProduct.highlights[2])
        setValue("highlight4",selectedProduct.highlights[3])
        setValue("sizes",selectedProduct.sizes.map(size=>size.id))
        setValue("colors",selectedProduct.colors.map(color=>color.id))
    }
  },[setValue,selectedProduct,params.id])

  const handleDelete=()=>{
    const product = {...selectedProduct}
    product.deleted = true
    dispatch(updateProductAsync(product))
  }
  return (
    <>
    <form noValidate class="bg-white py-12 px-5 mt-12 w-auto contents" onSubmit={handleSubmit((data)=>{
        console.log(data)
        const product = {...data}
        product.images = [product.image1,product.image2,product.image3,product.thumbnail]
        product.highlights = [product.highlight1,product.highlight2,product.highlight3,product.highlight4]
        product.rating=0
        product.colors=product.colors.map(color=>colors.find(clr=>clr.id===color))
        product.sizes=product.sizes.map(size=>sizes.find(sz=>sz.id===size))

        delete product['image1']
        delete product['image2']
        delete product['image3']
        
        product.price = +product.price
        product.discountPercentage = +product.discountPercentage
        product.stock = +product.stock
        
        console.log(product)

        if(params.id){
            product.id = params.id
            product.rating = selectedProduct.rating || 0
            dispatch(updateProductAsync(product))
            alert.success("Product Updated Successfully")
            reset()
        }else{
            dispatch(createProductAsync(product))
            alert.success("Product Created Successfully")
            reset()
        }
    })}>
      <div className="space-y-12 bg-white p-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Add Product
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("title", {
                      required: "title is required",
                    })}
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register("description", {
                      required: "description is required",
                    })}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about Product.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="brands"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brands
              </label>
              <div className="mt-2">
                <select {...register("brand", {
                      required: "brand is required",
                    })} id="">
                  <option value="">--choose brand--</option>
                  {brands.map((brand) => (
                    <option key={brand.value} value={brand.value}>{brand.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="colors"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Colors
              </label>
              <div className="mt-2">
                  {colors.map((color) => (
                    <>
                    <input type="checkbox"  {...register("colors", {
                    })} key={color.id} value={color.id}/>{' '}{color.name}
                    </>
                  ))}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="sizes"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Sizes
              </label>
              <div className="mt-2">
                  {sizes.map((size) => (
                    <>
                    <input  type="checkbox" {...register("sizes", {
                    })} key={size.id} value={size.id}/>{' '}{size.name}
                    </>
                  ))}
              </div>
            </div>


            <div className="col-span-full">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                category
              </label>
              <div className="mt-2">
                <select {...register("category", {
                      required: "category is required",
                    })} id="">
                  <option value="">--choose category--</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>{category.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="number"
                    {...register("price", {
                      required: "price is required",
                      min:1
                    })}
                    id="price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="discountPercentage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Discount Percentage
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="number"
                    {...register("discountPercentage", {
                      required: "discountPercentage is required",
                      min:0,
                      max:100
                    })}
                    id="discountPercentage"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="number"
                    {...register("stock", {
                      required: "stock is required",
                      min:0
                    })}
                    id="stock"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thumbnail
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("thumbnail", {
                      required: "thumbnail is required",
                    })}
                    id="thumbnail"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="image1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 1
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("image1", {
                      required: "image is required",
                    })}
                    id="image1"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="image2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 2
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("image2", {
                      required: "image is required",
                    })}
                    id="image2"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="image3"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 3
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("image3", {
                      required: "image is required",
                    })}
                    id="image3"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="highlight1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Highlight 1
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("highlight1", {
                    })}
                    id="highlight1"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="highlight2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Highlight 2
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("highlight2", {
                    })}
                    id="highlight2"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="highlight3"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Highlight 3
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("highlight3", {
                    })}
                    id="highlight3"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="highlight4"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Highlight 4
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("highlight4", {
                    })}
                    id="highlight4"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Extra
          </h2>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                By Email
              </legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-900"
                    >
                      Comments
                    </label>
                    <p className="text-gray-500">
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-gray-900"
                    >
                      Candidates
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-900"
                    >
                      Offers
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div> */}
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          to = "/admin"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </Link>
        {selectedProduct && <button
          onClick={(e)=>{e.preventDefault();setOpenModal(true)}}
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Delete
        </button>}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    {selectedProduct && <Modal
      title={`Delete ${selectedProduct.title}`}
      message="Are you sure you want to delete this Product?"
      dangerOption="Delete"
      cancelOption="Cancel"
      dangerAction={handleDelete}
      cancelAction={()=>setOpenModal(null)}
      showModal={openModal}
    ></Modal>}
    </>
  );
};

export default ProductForm;
