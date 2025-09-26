import React from "react";
import { useDashboardStore } from "../store/dashboardStore";
import { VscChromeClose } from "react-icons/vsc";

const Widget = ({ widget, categoryId }) => {
  const removeWidget = useDashboardStore((state) => state.removeWidget);

  return (
    <div className="widget">
      <div className="widget-header">
        <h3>{widget.title}</h3>
        <button
          className="remove-widget-btn"
          onClick={() => removeWidget(categoryId, widget.id)}
          title="Remove widget"
        >
          <VscChromeClose />
        </button>
      </div>
      <div className="widget-content">
        <p>{widget.content || "No graph data available."}</p>
      </div>
    </div>
  );
};

export default Widget;
