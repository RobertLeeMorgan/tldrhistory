import { useState } from "react";
import WidgetContainer from "../widgets/WidgetContainer";
import Menu from "../widgets/Menu";

export default function SearchBar({ handleOpen, handleSort }) {
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
        handleOpen={handleOpen}
      />
      <WidgetContainer widgetDisplay={widgetDisplay} />
    </>
  );
}
