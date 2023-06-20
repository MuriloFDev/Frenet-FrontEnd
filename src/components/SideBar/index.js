import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="h-screen bg-blue-900 fixed w-72 flex flex-col p-4">
      <div className="w-[50%] mx-auto">
        <src src="../../../public/assets/images/frenetLogo.svg" />
      </div>
      <Link to="/">
        <div className="btn btn-info text-white mt-3">
          <AiOutlineHome className="text-white text-2xl" />
          <span className="text-2xl">Home</span>
        </div>
      </Link>
      <Link to="/quote">
        <div className="btn btn-info text-white mt-3">
          <AiOutlineHome className="text-white text-2xl" />
          <span className="text-2xl">Cotar frete</span>
        </div>
      </Link>

      <Link to="/consult">
        <div className="btn btn-info text-white mt-3 flex">
          <AiOutlineHome className="text-white text-xl" />
          <span className="text-xl">Consultar</span>
        </div>
      </Link>
    </div>
  );
};

export default SideBar;
