import React, { useState } from "react";
import Widget from "./Widget";
import { useDashboardStore } from "../store/dashboardStore";

const Category = ({ category }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const addWidgetToCategory = useDashboardStore((state) => state.addWidgetToCategory);

  const handleAddWidget = (e) => {
    e.preventDefault();
    if (!widgetName.trim()) return;
    const newWidget = {
      id: `${category.id}-${Date.now()}`,
      title: widgetName,
      content: widgetText,
    };
    addWidgetToCategory(category.id, newWidget);
    setWidgetName("");
    setWidgetText("");
    setShowAddForm(false);
  };

  return (
    <section className="category">
      <div className="category-header">
        <h2>{category.title}</h2>
      </div>
      <div className="widget-container">
        {category.widgets.length > 0 ? (
          category.widgets.map((widget) => (
            <Widget key={widget.id} widget={widget} categoryId={category.id} />
          ))
        ) : (
          <div className="widget placeholder">
            <p>No widgets added to this category.</p>
          </div>
        )}
        {/* Add Widget card as the last card */}
        {showAddForm ? (
          <form
            className="widget add-widget-card"
            style={{ display: "flex", flexDirection: "column", gap: 8 }}
            onSubmit={handleAddWidget}
          >
            <input
              type="text"
              placeholder="Widget Name"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              required
              style={{ marginBottom: 8 }}
            />
            <textarea
              placeholder="Widget Text"
              value={widgetText}
              onChange={(e) => setWidgetText(e.target.value)}
              rows={2}
              style={{ marginBottom: 8 }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button type="submit" className="btn btn-primary">Add</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div
            className="widget add-widget-card"
            onClick={() => setShowAddForm(true)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fafbfc",
              border: "2px dashed #aaa",
            }}
          >
            <span style={{ fontSize: 24, color: "#888" }}>+ Add Widget</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;
