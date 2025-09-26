import React, { useState } from "react";
import { useDashboardStore } from "./store/dashboardStore";
import Category from "./components/Category";
import AddWidgetModal from "./components/AddWidgetModal";
import "./App.css";

function App() {
  const layout = useDashboardStore((state) => state.layout);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    layout[0]?.id || ""
  );

  // Filter categories and widgets by search term
  const filteredLayout = layout.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="app">
      <header className="app-header">
        <h1>CNAPP Dashboard</h1>
        <button
          className="add-widget-btn"
          style={{ marginBottom: 16, marginRight: 16 }}
          onClick={() => setIsModalOpen(true)}
        >
          + Add Widget
        </button>
        <input
          type="text"
          placeholder="Search widgets..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginTop: 16, marginBottom: 16, width: 300 }}
        />
      </header>
      <main className="dashboard">
        {filteredLayout.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </main>
      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categoryId={selectedCategoryId}
        setCategoryId={setSelectedCategoryId}
        layout={layout}
      />
    </div>
  );
}

export default App;
