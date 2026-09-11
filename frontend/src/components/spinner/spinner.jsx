import { ClipLoader } from "react-spinners";

const Spinner = ({ isLoading }) => {
  return (
    <div className="spinner-container">
      <ClipLoader
        color="#fff"
        align-self="center"
        loading={isLoading}
        size={50}
      />
    </div>
  );
};

export default Spinner;
