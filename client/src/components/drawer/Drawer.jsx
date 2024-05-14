import DrawerCheckbox from "./DrawerCheckbox";
import DrawerCollapse from "./DrawerCollapse";
import DrawerInput from "./DrawerInput";
import { collapseData } from "../../util/drawerValues";

export default function Drawer({ onSubmit, onReset, filter }) {
  return (
    <div className="drawer z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <form
          id="filter"
          className="menu p-4 pt-10 w-80 min-h-full bg-base-200 text-base-content"
          onSubmit={onSubmit}
        >
          {collapseData.map((e) => {
            return (
              <DrawerCollapse title={e.title} key={e.title}>
                {e.options.map((f, i) => {
                  return (
                    <DrawerCheckbox
                      name={f.name}
                      value={f.value}
                      labelText={f.labelText}
                      key={i}
                      defaultChecked={filter[f.name].includes(f.value)}
                    />
                  );
                })}
              </DrawerCollapse>
            );
          })}
          <DrawerCollapse title="Date Range">
            <DrawerInput
              type="number"
              name="start"
              min="-300000"
              max="1900"
              placeholder="Start"
              className="input input-bordered w-full max-w-xs"
              defaultValue={filter.year_start}
            />
            <DrawerInput
              type="number"
              name="end"
              min="-300000"
              max="1950"
              placeholder="End"
              className="input input-bordered w-full max-w-xs"
              defaultValue={filter.year_end}
            />
          </DrawerCollapse>
          <div className="relative flex items-center my-12">
            <input
              type="text"
              placeholder="Search"
              name="search"
              className="input input-bordered border-r-0 focus:ring-1 focus:ring-secondary focus:border-transparent rounded-r-none flex"
              defaultValue={filter.search}
            />
            <button type="submit" className="btn btn-secondary rounded-l-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-search"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </button>
          </div>
          <button type="submit" className="btn">
            Apply
          </button>
          <button
            type="button"
            className="btn btn-secondary mt-4"
            onClick={onReset}
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
}
