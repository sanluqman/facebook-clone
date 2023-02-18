import React from "react";

type MenuProps = {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu: React.FC<MenuProps> = ({ openMenu, setOpenMenu }) => {
  return (
    <>
      {/* <!-- Small Modal --> */}
      {openMenu && (
        <div
          id="small-modal"
          className="z-50 absolute p-4 overflow-x-hidden overflow-y-hidden h-[550px] top-10 right-0 ml-auto  shadow-2xl bg-[#F7F8FA]"
        >
          <div className="relative w-full h-full max-w-md md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-[#F7F8FA] rounded-lg shadow h-[550px]">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-2xl font-bold  text-gray-900">Menu</h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="small-modal"
                  onClick={() => setOpenMenu((prev) => !prev)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-6 space-y-6">//!!!!</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Menu;
