import './css/LoadingSpinner.css';

const LoadingSpinner = ({ className }) => {
  return (
    <div
      style={{ flex: 1 }}
      className={`h5 w-100 d-flex justify-content-center align-items-center flex-column ${
        className ?? ''
      }`}
    >
      <div className='loading-spinner mb-2'>
        <i className='fa-solid fa-spinner fa-spin-pulse'></i>
      </div>
      <p dir='rtl' className='font-ar'>
        جار التحميل...
      </p>
    </div>
  );
};

export default LoadingSpinner;
