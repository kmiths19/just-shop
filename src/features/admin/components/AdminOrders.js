import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from "../../order/orderSlice";
import { XMarkIcon, EyeIcon, PencilIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline'
import Pagination from "../../common/Pagination";


function AdminOrders() {
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders)


  const [editableOrderId, setEditableOrderId] = useState(-1)

  const handleShow = () => {
    console.log("HandleShow")
  }

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  }

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value }
    dispatch(updateOrderAsync(updatedOrder))
    setEditableOrderId(-1);
  }

  const handlePage = (page) => {
    setPage(page);
  }

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  }


  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return 'bg-purple-200 text-purple-600';
      case "processed":
        return 'bg-yellow-200 text-yellow-600';
      case "delivered":
        return 'bg-green-200 text-green-600';
      case "refunded":
        return 'bg-cyan-200 text-cyan-600';
      case "cancelled":
        return 'bg-red-200 text-red-600';
      default:
        return 'bg-purple-200 text-purple-600';
    }

  }

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
    dispatch(fetchAllOrdersAsync({ sort, pagination }))
  }, [dispatch, sort, page])

  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left cursor-pointer" onClick={e => handleSort({ sort: 'id', order: sort?._order === 'asc' ? 'desc' : 'asc', })}>Order# {' '}{sort._sort === 'id' && (sort._order === 'asc' ? <ArrowDownIcon className="w-4 h-4 inline" /> : <ArrowUpIcon className="w-4 h-4 inline" />)}</th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th className="py-3 px-6 text-left">Quantity</th>
                  <th className="py-3 px-6 text-center cursor-pointer" onClick={e => handleSort({ sort: 'totalAmount', order: sort?._order === 'asc' ? 'desc' : 'asc', })}>Total Amount {' '}{sort._sort === 'totalAmount' && (sort._order === 'asc' ? <ArrowDownIcon className="w-4 h-4 inline" /> : <ArrowUpIcon className="w-4 h-4 inline" />)}</th>
                  <th className="py-3 px-6 text-center">Shipping Address</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map(order =>
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">
                        </div>
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.items.map(item =>
                        <div className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.thumbnail}
                            />
                          </div>
                          <span>{item.title}</span>
                        </div>)}
                    </td>
                    {order.items.map(item => <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span>{item.quantity}</span>
                      </div>
                    </td>)}
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <sup>$</sup>{order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="items-center justify-center">
                        <div></div><strong>{order.selectedAddress.firstName}&nbsp;{order.selectedAddress.lastName}</strong>
                        <div>Street: {order.selectedAddress.streetAddress}, </div>
                        <div>City: {order.selectedAddress.city}, </div>
                        <div>State: {order.selectedAddress.region}, </div>
                        <div>PIN/ZIP: {order.selectedAddress.pinCode}, </div>
                        <div>Country: {order.selectedAddress.country}</div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {order.id === editableOrderId ? (
                        <select onChange={e => handleUpdate(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="processed">Processed</option>
                          <option value="delivered">Delivered</option>
                          <option value="refunded">Refunded</option>
                          <option value="cancelled">Cancelled</option>
                        </select>) : (
                        <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <EyeIcon className="w-6 h-4" onClick={e => handleShow(order)} />
                        </div>
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <PencilIcon className="w-6 h-4" onClick={e => handleEdit(order)} />
                        </div>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalOrders} />
    </div>

  )
}

export default AdminOrders;