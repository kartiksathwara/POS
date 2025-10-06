import { useEffect, useState } from "react";

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
    setCartItems(lastOrder.cartItems || []);

    const sub = lastOrder.cartItems.reduce(
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

  return (
    <div id="receipt" className="hidden print:flex print:flex-col print:fixed print:top-0 print:left-0 print:w-full print:min-h-[297mm] print:bg-white print:p-12  text-black text-[13px]"
    >

      <div className="text-center mb-2">
        <h1 className="text-[14px] font-bold uppercase">DKC Pvt. Ltd.</h1>
        <p>📍 123 Market St, NY</p>
        <p>📞 +1 555-123-4567</p>
        <p className="mt-1">{new Date().toLocaleString()}</p>   
        <hr className="my-2 border-dashed border-t" />
      </div>

      <div className="mb-2 text-[11px]">
        <p><strong>Customer:</strong> {customer.name || "N/A"}</p>
        <p><strong>Phone:</strong> {customer.phone || "N/A"}</p>
      </div>

      <table className="w-full mb-2">
        <thead className="border-y border-black text-left">
          <tr>
            <th>Item</th>
            <th className="text-right">Qty</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, idx) => (
            <tr key={idx}>
              <td>{item.title}</td>
              <td className="text-right">{item.quantity}</td>
              <td className="text-right">${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="my-1 border-dashed" />

      <div className="text-[11px] space-y-0.5">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount ({discountValue})</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold border-t pt-1 mt-1">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center mt-2 text-xs italic">
        <p>{discountReason}</p>
        <p className="mt-2 font-bold">Thank you!</p>
      </div>
    </div>
  );
};

export default ReceiptPrint;