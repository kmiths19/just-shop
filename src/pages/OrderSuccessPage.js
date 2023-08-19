import { Link } from "react-router-dom";

export default function OrderSuccessPage(order) {
    return (
      <>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-5xl font-semibold text-indigo-600">Success</p>
            <h1 className="mt-4 text-base font-bold tracking-tight text-gray-900 sm:text-base">Order Placed Successfully #123456</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Order placed, check it by going to My Account &#8677; Orders section</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to='/'
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
              <Link to='/contact' className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }