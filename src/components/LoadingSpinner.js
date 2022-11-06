import "./css/LoadingSpinner.css";

const LoadingSpinner = () => {
	return (
		<div className="h5 w-100 d-flex justify-content-end align-items-center flex-column">
			<div className="loading-spinner mb-2">
				<i className="fa-solid fa-spinner"></i>
			</div>
			<p dir="rtl" className="font-ar">
				جار التحميل...
			</p>
		</div>
	);
};

export default LoadingSpinner;
