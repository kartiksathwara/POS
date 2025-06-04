import { Link } from "react-router-dom"
import Header from "./Header"

const Settingpage = () => {
	return (
		<div>
			<Header />
			<div>
				<div className="flex items-center p-7 gap-2">
					<Link to="/" className="">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
							<path d="M12.2665 1.98191C12.6666 1.58183 13.3186 1.59307 13.7047 2.0067L13.7437 2.04845C14.1096 2.44049 14.1011 3.05137 13.7244 3.43311L7.69142 9.54765C7.3072 9.93706 7.3072 10.5629 7.69142 10.9523L13.7244 17.0669C14.1011 17.4486 14.1096 18.0595 13.7437 18.4516L13.7047 18.4933C13.3186 18.9069 12.6666 18.9182 12.2665 18.5181L4.70554 10.9571C4.31502 10.5666 4.31502 9.93342 4.70554 9.54289L12.2665 1.98191Z" fill="#333333" />
						</svg>
					</Link>
					<h1 className="text-xl capitalize font-bold">Settings</h1>
				</div>
			</div>
		</div>
	)
}

export default Settingpage