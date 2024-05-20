import { Link } from "react-router-dom";

export default function Menu({
  widgetDisplay,
  handleClick,
  handleSort,
}) {
  return (
    <div className="menu fixed z-40 top-28 right-0 lg:right-2 xl:top-20 xl:right-4 2xl:right-6 2xl:top-28 w-max">
      <div className="tooltip tooltip-left" data-tip="Create article">
        <Link
          className="btn btn-circle btn-secondary drawer-button mb-3 border border-black btn-md xl:btn-lg border-2 hover:border-gray-300 hover:border"
          to="/post"
          aria-label="Create article"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </Link>
      </div>
      <div className="tooltip tooltip-left" data-tip="Search/filter">
        <label
          htmlFor="my-drawer"
          className="btn drawer-button z-50 btn-circle btn-md xl:btn-lg mb-3 border border-black hover:border-gray-400 hover:border"
          aria-label="Search and filter timeline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </label>
      </div>
      <div className="tooltip tooltip-left" data-tip="Sort">
        <button
          onClick={handleSort}
          className="btn btn-circle drawer-button btn-md mb-3 xl:btn-lg border border-black hover:border-gray-400 hover:border-1"
          aria-label="Sort timeline"
        >
          <svg
            fill="currentColor"
            height="30px"
            width="30px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 490.00 490.00"
          >
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>{" "}
            <polygon points="85.877,154.014 85.877,428.309 131.706,428.309 131.706,154.014 180.497,221.213 217.584,194.27 108.792,44.46 0,194.27 37.087,221.213 "></polygon>{" "}
            <polygon points="404.13,335.988 404.13,61.691 358.301,61.691 358.301,335.99 309.503,268.787 272.416,295.73 381.216,445.54 490,295.715 452.913,268.802 "></polygon>{" "}
          </svg>
        </button>
      </div>
      <div
        className="tooltip tooltip-left font-normal"
        data-tip="Display widgets"
      >
        <button
          className={`btn btn-circle border border-black z-50 xl:btn-lg hover:border-gray-300 hover:border transform transition-transform ease-in-out ${
            widgetDisplay ? "" : "rotate-180"
          }`}
          onClick={() => {
            handleClick();
          }}
          aria-label="Display widgets"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
