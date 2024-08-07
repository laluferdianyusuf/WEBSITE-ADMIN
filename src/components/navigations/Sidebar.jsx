import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import PropTypes from "prop-types";
import ButtonAuth from "../atoms/ButtonAuth";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { IoClose } from "react-icons/io5";

export default function Sidebar({
  activeMenu,
  handleMenuClick,
  isLoggedIn,
  onLogout,
  isOpen,
  handleMenuToggle,
  user,
}) {
  const menu = [
    {
      name: "Nota",
      icon: <FaRegMoneyBillAlt />,
      handler: () => {
        handleMenuToggle();
        handleMenuClick("Nota");
      },
    },
    {
      name: "Hotel",
      icon: <FaHotel />,
      handler: () => {
        handleMenuToggle();
        handleMenuClick("Hotel");
      },
    },
    {
      name: "Produk",
      icon: <AiFillProduct />,
      handler: () => {
        handleMenuToggle();
        handleMenuClick("Produk");
      },
    },
  ];

  const handleLogin = () => {
    handleMenuClick("Login");
  };

  return (
    <div
      className={`fixed lg:static top-0 left-0 z-50 lg:z-0 w-64 pl-7 pr-3 flex flex-col ${
        isLoggedIn ? "justify-between" : ""
      } bg-custom-black-1 h-full lg:h-auto transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className={`my-6 ${isLoggedIn ? "" : "mb-10"}`}>
        <div className="text-custom-white-1 lg:hidden text-right">
          <button>
            <IoClose
              size={20}
              className="cursor-pointer"
              onClick={handleMenuToggle}
            />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-col">
          <span>
            <h1 className="font-semibold text-xl text-custom-white-1 mt-4">
              UD TIMUR JAYA RAYA
            </h1>
          </span>
        </div>
        <div className="mt-6 lg:mt-16">
          <ul className="space-y-4">
            <div className="font-semibold text-xs text-slate-500">
              MENU MANAJEMEN
            </div>
            {menu.map((val, index) => {
              return (
                <div key={index}>
                  <div className="flex flex-row justify-center ease-in-out duration-300">
                    <span
                      className={`self-center ease-in-out duration-300 ${
                        activeMenu === val.name ||
                        activeMenu === `${val.name}Detail`
                          ? "w-[5px] h-[20px] bg-custom-green-2"
                          : "w-[0px] h-[0px]"
                      }  rounded-full`}
                    ></span>
                    <button
                      key={index}
                      className={`ease-in-out duration-300 font-semibold text-white flex flex-row items-center w-full p-2 ${
                        activeMenu === val.name ||
                        activeMenu === `${val.name}Detail`
                          ? "ps-3"
                          : ""
                      }`}
                      onClick={val.handler}
                      disabled={!isLoggedIn}
                    >
                      <div
                        className={`${
                          activeMenu === val.name ||
                          activeMenu === `${val.name}Detail`
                            ? "text-custom-green-2"
                            : ""
                        }`}
                      >
                        {val.name}
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        {isLoggedIn ? (
          <div className="lg:hidden mt-10" onClick={handleMenuToggle}>
            <ButtonAuth handle={onLogout}>
              <IoMdLogOut size={18}/>
              <p className="lowercase">admin</p>
            </ButtonAuth>
          </div>
        ) : (
          <div className="lg:hidden mt-10" onClick={handleMenuToggle}>
            <ButtonAuth handle={handleLogin} isLogin={true}>
              <IoMdLogIn size={18}/>
              <p className="capitalize">Login</p>
            </ButtonAuth>
          </div>
        )}
      </div>
      {isLoggedIn ? (
        <div className="hidden lg:block mb-10">
          <ButtonAuth handle={onLogout}>
            <IoMdLogOut size={18}/>
            <p className="lowercase">admin</p>
          </ButtonAuth>
        </div>
      ) : (
        <div className="hidden lg:block mb-10">
          <ButtonAuth handle={handleLogin} isLogin={true}>
            <IoMdLogIn size={18}/>
            <p className="capitalize">Login</p>
          </ButtonAuth>
        </div>
      )}
    </div>
  );
}

Sidebar.propTypes = {
  activeMenu: PropTypes.string,
  handleMenuClick: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func,
  isOpen: PropTypes.bool,
  handleMenuToggle: PropTypes.func,
};
