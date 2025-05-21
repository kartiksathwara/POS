import Header from "./Header"
import SearchBar from "./SearchBar"

const Customers = () => {
	return (
		<div>
			<Header />
			<div>
				<div>
					<SearchBar />
					<div className="flex justify-between items-center p-4">
						<div className="flex items-center">
							<span className=" mr-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
									<path d="M12.2665 1.98191C12.6666 1.58183 13.3186 1.59307 13.7047 2.0067L13.7437 2.04845C14.1096 2.44049 14.1011 3.05137 13.7244 3.43311L7.69142 9.54765C7.3072 9.93706 7.3072 10.5629 7.69142 10.9523L13.7244 17.0669C14.1011 17.4486 14.1096 18.0595 13.7437 18.4516L13.7047 18.4933C13.3186 18.9069 12.6666 18.9182 12.2665 18.5181L4.70554 10.9571C4.31502 10.5666 4.31502 9.93342 4.70554 9.54289L12.2665 1.98191Z" fill="#333333" />
								</svg>
							</span>
							<h1 className="text-xl font-bold">CUSTOMERS</h1>
						</div>
						<button className="bg-(--buttonbg) text-black py-1 px-4 rounded-lg flex items-center">
							Add Customer
							<span className="ml-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
									<path d="M4.65207 1.55133C4.40515 1.30441 4.00273 1.31135 3.76447 1.56663C3.53864 1.80859 3.54387 2.18561 3.77633 2.42121L7.10737 5.79726C7.49159 6.18667 7.49159 6.81254 7.10737 7.20195L3.77633 10.578C3.54387 10.8136 3.53864 11.1906 3.76447 11.4326C4.00273 11.6879 4.40515 11.6948 4.65207 11.4479L8.89324 7.20672C9.28377 6.81619 9.28377 6.18303 8.89324 5.7925L4.65207 1.55133Z" fill="#333333" />
								</svg>
							</span>
						</button>
					</div>
					<div></div>
				</div>
			</div>
		</div>
	)
}

export default Customers