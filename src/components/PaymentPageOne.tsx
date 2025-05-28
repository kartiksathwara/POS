import React from 'react'
import Header from './Header'
import { FaCheckCircle } from "react-icons/fa";

const PaymentPageOne: React.FC = () => {
    const price = 120.0;
    const discountRate = 0.18;
    const tax = 0.08;
    const bagFee = 2.00;

    const discount = price * discountRate;
    const totoalTax = price * tax;
    const total = price - discount + totoalTax + bagFee
  return (
    <div className='h-screen'>
      <Header />
      <div className='flex flex-col items-center justify-center py-12 px-4'>
        <div className='bg-(--payment) h-40 w-full max-w-md flex flex-col items-center justify-center'>
          <FaCheckCircle className='text-green-500 text-4xl' />
          <p className='text-3xl py-4'>Payment Successful</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default PaymentPageOne
