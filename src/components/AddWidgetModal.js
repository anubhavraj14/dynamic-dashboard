import React, { useState, useEffect } from "react";
import { useDashboardStore } from "../store/dashboardStore";

const AddWidgetModal = ({
  isOpen,
  onClose,
  categoryId,
  setCategoryId,
  layout,
}) => {
  const { allWidgets, setWidgetsForCategory } = useDashboardStore();

  // Use the selected category
  const category = layout.find((c) => c.id === categoryId);
  const currentWidgetIds = category ? category.widgets.map((w) => w.id) : [];

  const [activeTab, setActiveTab] = useState(Object.keys(allWidgets)[0]);
  const [selectedWidgets, setSelectedWidgets] = useState(
    new Set(currentWidgetIds)
  );

  useEffect(() => {
    setSelectedWidgets(new Set(currentWidgetIds));
  }, [categoryId, isOpen]);

  if (!isOpen) return null;

  const handleCheckboxChange = (widgetId) => {
    const newSelection = new Set(selectedWidgets);
    if (newSelection.has(widgetId)) {
      newSelection.delete(widgetId);
    } else {
      newSelection.add(widgetId);
    }
    setSelectedWidgets(newSelection);
  };

  const handleConfirm = () => {
    setWidgetsForCategory(categoryId, Array.from(selectedWidgets));
    onClose();
  };

  const filteredWidgets = allWidgets[activeTab];

  // Remove dropdown, add category tabs
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Widget</h2>
          <button onClick={onClose} className="close-modal-btn">
            &times;
          </button>
        </div>
        <p>Personalise your dashboard by adding the following widget</p>
        <div className="modal-body">
          <div className="tabs">
            {layout.map((cat) => (
              <button
                key={cat.id}
                className={`tab-btn ${categoryId === cat.id ? "active" : ""}`}
                onClick={() => setCategoryId(cat.id)}
              >
                {cat.title}
              </button>
            ))}
          </div>
          <div className="widget-list">
            {allWidgets[categoryId]?.map((widget) => (
              <div key={widget.id} className="widget-list-item">
                <input
                  type="checkbox"
                  id={widget.id}
                  checked={selectedWidgets.has(widget.id)}
                  onChange={() => handleCheckboxChange(widget.id)}
                />
                <label htmlFor={widget.id}>{widget.title}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
