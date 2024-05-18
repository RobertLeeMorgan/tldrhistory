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
          <div className="relative flex items-center justify-center my-12">
            <input
              type="text"
              placeholder="Search"
              name="search"
              className="input input-bordered focus:ring-1 focus:ring-secondary focus:border-transparent flex w-64"
              defaultValue={filter.search}
            />
          </div>
          <div className="items-center justify-center flex flex-col">
          <button type="submit" className="btn w-64">
            Apply
          </button>
          <button
            type="button"
            className="btn btn-secondary mt-4 w-64"
            onClick={onReset}
          >
            Clear
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}
