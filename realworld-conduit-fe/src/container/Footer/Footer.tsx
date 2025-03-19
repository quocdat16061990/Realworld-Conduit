import path from "@/constants/path";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-500 absolute w-full bottom-0 left-0 p-4 ">
      <div className="max-w-[1440px] mx-auto flex items-center gap-x-3">
        <Link
          className="text-[#5CB85C] text-2xl font-bold block text-center"
          to={path.home}
        >
          Conduit
        </Link>
        <p className="text-sm text-gray-700">
          An interactive learning project from Thinkster. Code & design licensed
          under MIT.
        </p>
      </div>
    </div>
  );
};

export default Footer;
