import { ClipLoader } from "react-spinners";

const Spinner = ({ isLoading }) => {
  return (
    <div className="spinner-container">
      <ClipLoader className="spinner" loading={isLoading} />
    </div>
  );
};

export default Spinner;
