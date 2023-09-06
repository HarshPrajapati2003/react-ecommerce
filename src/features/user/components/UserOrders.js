import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserInfoStatus,
  selectUserOrders,
} from "../userSlice";
import { Link } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import ReactStars from "react-rating-stars-component";
export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserInfoStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "text-xl my-5 font-bold tracking-tight text-purple-600";
      case "dispatched":
        return "text-xl my-5 font-bold tracking-tight text-yellow-600";
      case "delivered":
        return "text-xl my-5 font-bold tracking-tight text-green-600";
      case "received":
        return "text-xl my-5 font-bold tracking-tight text-green-600";
      case "cancelled":
        return "text-xl my-5 font-bold tracking-tight text-red-600";
      default:
        return "text-xl my-5 font-bold tracking-tight text-purple-600";
    }
  };

  return (
    <>
     {status !== "loading" && <div>
      {(!orders || orders.length===0 ) ? <><h1 className="text-center text-red-600 text-2xl">No Orders Yet!</h1><h2 className="text-center mt-3 text-indigo-600"><Link to="/">Click here to Go Back</Link></h2></>: <h1 className="text-center text-purple-600 font-bold text-2xl">My Orders</h1>}</div>}

        {status === "loading" ? (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="rgb(67, 56, 202)"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      ) : null}
     
      {orders &&
        orders.map((order) => (
          <div>
            <div className="mx-auto bg-white mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1
                  className="my-5 font-bold tracking-tight text-gray-900 text-xl sm:text-3xl md:text-4xl"
                >
                  Order #{order.id}
                </h1>
                <h3 className={`${chooseColor(
                            order.status
                          )}`}>
                  Order status : {order.status}
                </h3>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.product.id}>
                                  {item.product.title}
                                </a>
                              </h3>
                              <p className="ml-4">
                                ${item.product.discountedPrice}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty : {item.quantity}
                              </label>
                            </div>

                            {order.status==='delivered' && <div className="flex">
                            <div className="text-red-600 hidden md:block">Give Your Product Review :  </div>
                            <ReactStars
                              count={5}
                              onChange={ratingChanged}
                              size={24}
                              isHalf={true}
                              emptyIcon={<i className="far fa-star"></i>}
                              halfIcon={<i className="fa fa-star-half-alt"></i>}
                              fullIcon={<i className="fa fa-star"></i>}
                              activeColor="#ffd700"
                            />
                            </div>}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${order.totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>{order.totalItems} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping Address :
                </p>
                <div className="flex flex-col sm:flex-row justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectedAddress.name}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 whitespace-normal">
                        {order.selectedAddress.street}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {order.selectedAddress.pincode}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-y-2 sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900 whitespace-normal">
                      Phone: {order.selectedAddress.phone}
                    </p>
                    <p className="text-sm ms-3 leading-6 text-gray-500 whitespace-normal">
                      {order.selectedAddress.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      
  
    
    </>
  );
}
