import { lazy, Suspense, useState } from "react";
import Menu from "../widgets/Menu";

const WidgetContainer = lazy(() => import("../widgets/WidgetContainer"));

export default function SearchBar({ handleSort }) {
  const [widgetDisplay, setWidgetDisplay] = useState(false);

  function handleClick() {
    setWidgetDisplay(!widgetDisplay);
  }

  return (
    <>
      <Menu
        widgetDisplay={widgetDisplay}
        handleClick={handleClick}
        handleSort={handleSort}
      />
      <div
        className={`${
          widgetDisplay ? "translate-y-0" : "translate-y-full"
        } fixed w-screen bottom-0 z-30 transform duration-300 ease-in-out`}
      >
        {widgetDisplay && (
          <Suspense fallback={<></>}>
            <WidgetContainer widgetDisplay={widgetDisplay} />
          </Suspense>
        )}
      </div>
    </>
  );
}
