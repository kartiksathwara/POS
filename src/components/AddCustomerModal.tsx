import { useState } from "react";
import type { Customer } from "./Customers";
import { IoIosArrowForward } from "react-icons/io";

interface AddCustomerModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (customer: Customer) => void;
	
}


const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ isOpen, onClose ,onSave}) => {
	const [form, setForm] = useState({
		name: "",
		phone: "",
		email: "",
		address1: "",
		address2: "",
		country: "",
		state: "",
		city: "",
		zip: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleClear = () => {
		setForm({
			name: "",
			phone: "",
			email: "",
			address1: "",
			address2: "",
			country: "",
			state: "",
			city: "",
			zip: "",
		});
	};
	const handleSave = () => {
		onSave(form); 
		handleClear();
		onClose(); 
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
			<div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 space-y-4 border" onClick={(e) => e.stopPropagation()}>
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-semibold text-gray-800">Add customer</h2>
					<div className="flex space-x-2">
						<button className="text-gray-600 px-4 py-1  rounded-md bg-gray-100" onClick={handleClear}>
							CLEAR
						</button>
						<button className="bg-(--buttonbg) flex items-center gap-1  text-black font-semibold pl-3 py-1 rounded-md" onClick={handleSave}>
							SAVE
							<IoIosArrowForward />
						</button>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-1 gap-4">
					<div className=" space-y-3">
						<div className="border-(--primary) border rounded-md flex flex-col relative">
							<label className="absolute top-1 left-4">Name*</label>
							<input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" className="input p-2 pl-4 pt-7 focus:outline-0" />
						</div>
						<div className="border-(--primary) border rounded-md flex flex-col relative">
							<label className="absolute top-1 left-4">Phone*</label>
							<input name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your number" className="input  p-2 pl-4 pt-7 focus:outline-0" />
						</div>
						<div className="border-(--primary) border rounded-md flex flex-col relative">
							<label className="absolute top-1 left-4">Email*</label>
							<input name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" className="input p-2 pl-4 pt-7 focus:outline-0" />
						</div>
					</div>
					<div className="grid grid-cols-2 gap-3 ">
						<div className="border-(--primary) border rounded-md flex flex-col relative">
							<label className="absolute top-1 left-4">Address*</label>
							<input name="address1" value={form.address1} onChange={handleChange} placeholder="Store name/no." className="input p-2 pl-4 pt-7 focus:outline-0" />
						</div>
						<div className="border-(--primary) border rounded-md flex flex-col relative">
							<label className="absolute top-1 left-4">Address*</label>
							<input name="address2" value={form.address2} onChange={handleChange} placeholder="Street, Area" className="input p-2 pl-4 pt-7 focus:outline-0" />
						</div>
						<div className="border-(--primary) border rounded-md flex flex-col relative">
							<label className="absolute top-1 left-4">Country*</label>
							<select name="country" value={form.country} onChange={handleChange} className="input p-2 pl-4 pt-7 focus:outline-0">
								<option value="">Select country</option>
								<option value="India">India</option>
							</select>
						</div>
						<div className="border-(--primary) border rounded-md flex flex-col relative">
							<label className="absolute top-1 left-4">State*</label>
							<select name="state" value={form.state} onChange={handleChange} className="input p-2 pl-4 pt-7 focus:outline-0">
								<option value="">Select state</option>
								<option value="Gujrat">Gujrat</option>
							</select>
						</div>
						<div className="border-(--primary) border rounded-md flex flex-col relative">
							<label className="absolute top-1 left-4">City*</label>
							<select name="city" value={form.city} onChange={handleChange} className="input p-2 pl-4 pt-7 focus:outline-0">
								<option value="">Select city</option>
								<option value="Kadi">Kadi</option>
							</select>
						</div>
						<div className="border-(--primary) border rounded-md flex flex-col relative">
							<label className="absolute top-1 left-4">Zip/Pin Code*</label>
							<input name="zip" value={form.zip} onChange={handleChange} placeholder="Zip/Pin code" className="input p-2 pl-4 pt-7 focus:outline-0" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddCustomerModal;