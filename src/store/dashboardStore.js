import { create } from "zustand";
import data from "../data/initialData.json";

export const useDashboardStore = create((set) => ({
  // State: The layout of categories and their widgets
  layout: data.initialLayout,

  // State: A master list of all possible widgets, organized by category
  allWidgets: data.allWidgets,

  // Action: Remove a widget from a specific category
  removeWidget: (categoryId, widgetId) =>
    set((state) => ({
      layout: state.layout.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter((w) => w.id !== widgetId),
            }
          : category
      ),
    })),

  // Action: Set the complete list of widgets for a category (used by the modal)
  setWidgetsForCategory: (categoryId, newWidgetIds) =>
    set((state) => {
      // Find the full widget objects from the master list based on their IDs
      const newWidgets = state.allWidgets[categoryId].filter((widget) =>
        newWidgetIds.includes(widget.id)
      );

      return {
        layout: state.layout.map((category) =>
          category.id === categoryId
            ? { ...category, widgets: newWidgets }
            : category
        ),
      };
    }),

  // Action: Add a new widget to a specific category
  addWidgetToCategory: (categoryId, widget) =>
    set((state) => ({
      layout: state.layout.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: [...category.widgets, widget],
            }
          : category
      ),
      allWidgets: {
        ...state.allWidgets,
        [categoryId]: [...(state.allWidgets[categoryId] || []), widget],
      },
    })),
}));
