import { useEffect } from "react";
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import { discountedPrice } from "../../../app/constants";

function UserOrders() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    const orders = useSelector(selectUserOrders);

    useEffect(() => {
        dispatch(fetchLoggedInUserOrdersAsync(user.id))
    }, [dispatch])
    return (
        <>
            {orders.map((order) => (
                <div className="mx-auto mt-5 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-t  border-gray-100 px-4 py-0 sm:px-6">
                        <h1 className="text-xl my-5 font-bold tracking-tight text-gray-900">Order #{order.id}</h1>
                        <h1 className="text-base my-5 font-bold tracking-tight text-red-600">Order Status: {order.status} </h1>
                        <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-white-200">
                                {order.items.map((item) => (
                                    <li key={item.id} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <a href={item.href}>{item.title}</a>
                                                    </h3>
                                                    <p className="ml-4"><sup>$</sup>{discountedPrice(item)}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className="text-gray-500">
                                                    <label htmlFor="quantity" className="inlin mr-5 text-sm font-medium leading-6 text-gray-900">
                                                        Qty: {item.quantity}
                                                    </label>
                                                </div>

                                                <div className="flex">
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                <p>Total Items in Cart</p>
                                <p>{order.totalItemsCount} items</p>
                            </div>
                            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p><sup>$</sup>{order.totalAmount}</p>
                            </div>
                        </div>
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Shipping Address</h2>
                            <div className="flex justify-between gap-x-6 py-5">
                                <div className="flex min-w-0 gap-x-4">

                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{order.selectedAddress.firstName}&nbsp;{order.selectedAddress.lastName}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Phone: {order.selectedAddress.phone}</p>
                                    </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900">{order.selectedAddress.streetAddress},&nbsp;{order.selectedAddress.city}</p>
                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        {order.selectedAddress.region},&nbsp; {order.selectedAddress.country}, PIN: {order.selectedAddress.pinCode}</p>
                                </div>
                            </div>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">Payment Method: {order.paymentMethod}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default UserOrders;