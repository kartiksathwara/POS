// import { useEffect, useState } from "react";

// const ReceiptPrint = () => {
//   const [cartItems, setCartItems] = useState<any[]>([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [tax, setTax] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [discountValue, setDiscountValue] = useState("0%");
//   const [discountReason, setDiscountReason] = useState("");
//   const [customer, setCustomer] = useState<any>({});

// useEffect(() => {
//   const lastOrderRaw = localStorage.getItem("lastOrder");
//   const discountPercent = localStorage.getItem("selectedDiscount") || "18%";
//   const reason = localStorage.getItem("discountReason") || "";

//   if (lastOrderRaw) {
//     const lastOrder = JSON.parse(lastOrderRaw);
//     setCartItems(lastOrder.cartItems || []);

//     const sub = lastOrder.cartItems.reduce(
//       (acc: number, item: any) => acc + item.price * item.quantity,
//       0
//     );
//     const discountPerc = parseFloat(discountPercent.replace("%", ""));
//     const discountAmt = sub * (discountPerc / 100);
//     const taxAmt = (sub - discountAmt) * 0.08;
//     const totalAmt = sub - discountAmt + taxAmt;

//     setSubtotal(sub);
//     setDiscount(discountAmt);
//     setTax(taxAmt);
//     setTotal(totalAmt);

//     setCustomer(lastOrder.customer || {});
//   }

//   setDiscountValue(discountPercent);
//   setDiscountReason(reason);
// }, []);

//   return (
//     <div id="receipt" className="hidden print:flex print:flex-col print:fixed print:top-0 print:left-0 print:w-full print:min-h-[297mm] print:bg-white print:p-12  text-black text-[13px]"
//     >

//       <div className="text-center mb-2">
//         <h1 className="text-[14px] font-bold uppercase">DKC Pvt. Ltd.</h1>
//         <p>📍 123 Market St, NY</p>
//         <p>📞 +1 555-123-4567</p>
//         <p className="mt-1">{new Date().toLocaleString()}</p>   
//         <hr className="my-2 border-dashed border-t" />
//       </div>

//       <div className="mb-2 text-[11px]">
//         <p><strong>Customer:</strong> {customer.name || "N/A"}</p>
//         <p><strong>Phone:</strong> {customer.phone || "N/A"}</p>
//       </div>

//       <table className="w-full mb-2">
//         <thead className="border-y border-black text-left">
//           <tr>
//             <th>Item</th>
//             <th className="text-right">Qty</th>
//             <th className="text-right">Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cartItems.map((item, idx) => (
//             <tr key={idx}>
//               <td>{item.title}</td>
//               <td className="text-right">{item.quantity}</td>
//               <td className="text-right">${(item.price * item.quantity).toFixed(2)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <hr className="my-1 border-dashed" />

//       <div className="text-[11px] space-y-0.5">
//         <div className="flex justify-between">
//           <span>Subtotal</span>
//           <span>${subtotal.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Discount ({discountValue})</span>
//           <span>-${discount.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Tax (8%)</span>
//           <span>${tax.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between font-bold border-t pt-1 mt-1">
//           <span>Total</span>
//           <span>${total.toFixed(2)}</span>
//         </div>
//       </div>

//       <div className="text-center mt-2 text-xs italic">
//         <p>{discountReason}</p>
//         <p className="mt-2 font-bold">Thank you!</p>
//       </div>
//     </div>
//   );
// };

// export default ReceiptPrint;


// import { useEffect, useState } from "react";
// import { QRCodeCanvas } from "qrcode.react";

// const SHOP_UPI = "yourupi@bank";

// const ReceiptPrint = () => {
//   const [cartItems, setCartItems] = useState<any[]>([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [tax, setTax] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [discountValue, setDiscountValue] = useState("0%");
//   const [discountReason, setDiscountReason] = useState("");
//   const [customer, setCustomer] = useState<any>({});

//   useEffect(() => {
//     const lastOrderRaw = localStorage.getItem("lastOrder");
//     const discountPercent = localStorage.getItem("selectedDiscount") || "18%";
//     const reason = localStorage.getItem("discountReason") || "";

//     if (lastOrderRaw) {
//       const lastOrder = JSON.parse(lastOrderRaw);
//       const items = lastOrder.items || [];
//       setCartItems(items);

//       const sub = items.reduce(
//         (acc: number, item: any) => acc + item.price * item.quantity,
//         0
//       );

//       const discountPerc = parseFloat(discountPercent.replace("%", ""));
//       const discountAmt = sub * (discountPerc / 100);
//       const taxAmt = (sub - discountAmt) * 0.08;
//       const totalAmt = sub - discountAmt + taxAmt;

//       setSubtotal(sub);
//       setDiscount(discountAmt);
//       setTax(taxAmt);
//       setTotal(totalAmt);

//       setCustomer(lastOrder.customer || {});
//     }

//     setDiscountValue(discountPercent);
//     setDiscountReason(reason);
//   }, []);

//   const upiLink = `upi://pay?pa=${SHOP_UPI}&pn=DKC Pvt Ltd&am=${total.toFixed(
//     2
//   )}&cu=INR`;

//   return (
//     <div
//       id="receipt"
//       className="hidden print:flex print:justify-center print:items-start print:w-full print:bg-white print:p-6 text-[12px]"
//     >
//       <div className="w-[80mm] bg-white border border-gray-300 rounded-lg shadow-md p-4 print:shadow-none print:border-none">

//         {/* HEADER */}
//         <div className="text-center border-b border-dashed pb-2">
//           <h1 className="font-bold text-[16px] tracking-wide uppercase">
//             DKC Pvt. Ltd.
//           </h1>
//           <p className="text-gray-600">123 Market St, NY</p>
//           <p className="text-gray-600">+1 555-123-4567</p>
//           <p className="text-gray-500 text-[10px] mt-1">
//             {new Date().toLocaleString()}
//           </p>
//         </div>

//         {/* CUSTOMER */}
//         <div className="mt-3 text-[11px] bg-gray-50 rounded p-2">
//           <p>
//             <span className="font-semibold">Customer:</span>{" "}
//             {customer.name || "N/A"}
//           </p>
//           <p>
//             <span className="font-semibold">Phone:</span>{" "}
//             {customer.phone || "N/A"}
//           </p>
//         </div>

//         {/* ITEMS */}
//         <table className="w-full mt-3 text-[11px]">
//           <thead className="border-b border-gray-400 text-gray-700">
//             <tr>
//               <th className="text-left pb-1">Item</th>
//               <th className="text-right pb-1">Qty</th>
//               <th className="text-right pb-1">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map((item, i) => (
//               <tr key={i} className="border-b border-dashed last:border-none">
//                 <td className="py-1 pr-1">{item.title}</td>
//                 <td className="text-right">{item.quantity}</td>
//                 <td className="text-right font-medium">
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* TOTALS */}
//         <div className="mt-3 text-[11px] border-t border-dashed pt-2 space-y-1">
//           <div className="flex justify-between">
//             <span className="text-gray-600">Subtotal</span>
//             <span>${subtotal.toFixed(2)}</span>
//           </div>

//           <div className="flex justify-between text-green-600">
//             <span>Discount ({discountValue})</span>
//             <span>- ${discount.toFixed(2)}</span>
//           </div>

//           <div className="flex justify-between text-gray-600">
//             <span>Tax (8%)</span>
//             <span>${tax.toFixed(2)}</span>
//           </div>

//           <div className="flex justify-between font-bold text-[13px] border-t pt-2 mt-2">
//             <span>Total</span>
//             <span>${total.toFixed(2)}</span>
//           </div>
//         </div>

//         {/* QR */}
//         <div className="flex flex-col items-center mt-4 border-t border-dashed pt-3">
//           <QRCodeCanvas value={upiLink} size={110} />
//           <p className="text-[11px] font-semibold mt-1">
//             Scan & Pay • UPI / GPay / PhonePe
//           </p>
//         </div>

//         {/* FOOTER */}
//         <div className="text-center mt-3 text-[10px] text-gray-600 italic">
//           <p>{discountReason}</p>
//           <p className="font-bold not-italic mt-1 text-black">
//             Thank You • Visit Again!
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReceiptPrint;











import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const SHOP_UPI = "yourupi@bank";

const ReceiptPrint = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [discountValue, setDiscountValue] = useState("0%");
  const [discountReason, setDiscountReason] = useState("");
  const [customer, setCustomer] = useState<any>({});

  useEffect(() => {
    const lastOrderRaw = localStorage.getItem("lastOrder");
    const discountPercent = localStorage.getItem("selectedDiscount") || "18%";
    const reason = localStorage.getItem("discountReason") || "";

    if (lastOrderRaw) {
      const lastOrder = JSON.parse(lastOrderRaw);
      const items = lastOrder.items || [];
      setCartItems(items);

      const sub = items.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0
      );
      const discountPerc = parseFloat(discountPercent.replace("%", ""));
      const discountAmt = sub * (discountPerc / 100);
      const taxAmt = (sub - discountAmt) * 0.08;
      const totalAmt = sub - discountAmt + taxAmt;

      setSubtotal(sub);
      setDiscount(discountAmt);
      setTax(taxAmt);
      setTotal(totalAmt);
      setCustomer(lastOrder.customer || {});
    }

    setDiscountValue(discountPercent);
    setDiscountReason(reason);
  }, []);

  const upiLink = `upi://pay?pa=${SHOP_UPI}&pn=DKC Pvt Ltd&am=${total.toFixed(
    2
  )}&cu=INR`;

  return (
    <div className="hidden print:flex print:justify-center print:bg-white print:p-6">
      <div className="print:w-[210mm] print:min-h-[297mm] bg-white border border-gray-300 rounded-xl shadow-lg p-10 print:border-none print:shadow-none text-[14px]">

        {/* HEADER */}
        <div className="text-center bg-slate-800 text-white rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold tracking-wide uppercase">
            DKC Pvt. Ltd.
          </h1>
          <p className="opacity-90">123 Market St, NY</p>
          <p className="opacity-90">+1 555-123-4567</p>
          <p className="text-sm mt-2 opacity-70">
            {new Date().toLocaleString()}
          </p>
        </div>

        {/* CUSTOMER */}
        <div className="bg-gray-50 border rounded-md p-4 mb-6 text-sm">
          <p><b>Customer:</b> {customer.name || "N/A"}</p>
          <p><b>Phone:</b> {customer.phone || "N/A"}</p>
        </div>

        {/* ITEMS */}
        <table className="w-full text-sm mb-6">
          <thead className="border-b-2">
            <tr>
              <th className="text-left pb-2">Item</th>
              <th className="text-right pb-2">Qty</th>
              <th className="text-right pb-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="py-2">{item.title}</td>
                <td className="text-right">{item.quantity}</td>
                <td className="text-right font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALS */}
        <div className="border-t pt-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Discount ({discountValue})</span>
            <span>- ${discount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-xl border-t pt-3 mt-3">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* QR */}
        <div className="mt-12 flex justify-center">
          <div className="flex flex-col items-center">
            <div className="bg-white p-5 rounded-xl shadow-lg">
              <QRCodeCanvas value={upiLink} size={220} />
            </div>
            <p className="mt-3 font-semibold text-base text-center">
              Scan & Pay • UPI / GPay / PhonePe
            </p>
          </div>
        </div>

        {/* FOOTER */}
        {discountReason && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-6 text-center">
            🎉 {discountReason}
          </div>
        )}

        <div className="text-center mt-8 text-gray-600">
          <p className="font-bold text-black text-lg">Thank You!</p>
          <p>Visit Again</p>
        </div>

      </div>
    </div>
  );
}

export default ReceiptPrint;
