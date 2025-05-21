
const SearchBar = () => {
	return (
		<div>
			<div className="items-center p-8 relative">
				<input
					type="text"
					placeholder="Search here..."
					className="p-2 px-9 w-3xl border border-gray-400 rounded-md focus:outline-none"
				/>
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className="absolute left-11 top-1/2  -translate-y-1/2 ">
					<path d="M15.6363 16.697C15.9292 16.9899 16.4041 16.9899 16.697 16.697C16.9899 16.4041 16.9899 15.9292 16.697 15.6363L15.6363 16.697ZM12.9167 7.83334C12.9167 10.6408 10.6408 12.9167 7.83334 12.9167V14.4167C11.4692 14.4167 14.4167 11.4692 14.4167 7.83334H12.9167ZM7.83334 12.9167C5.02589 12.9167 2.75 10.6408 2.75 7.83334H1.25C1.25 11.4692 4.19746 14.4167 7.83334 14.4167V12.9167ZM2.75 7.83334C2.75 5.02589 5.02589 2.75 7.83334 2.75V1.25C4.19746 1.25 1.25 4.19746 1.25 7.83334H2.75ZM7.83334 2.75C10.6408 2.75 12.9167 5.02589 12.9167 7.83334H14.4167C14.4167 4.19746 11.4692 1.25 7.83334 1.25V2.75ZM11.4697 12.5303L15.6363 16.697L16.697 15.6363L12.5303 11.4697L11.4697 12.5303Z" fill="#0E1115" />
				</svg>
			</div>
		</div>
	)
}

export default SearchBar