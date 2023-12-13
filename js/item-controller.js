import { storageCtrl } from "./storageController.js";

export const ItemCtrl = (function () {
  // Factory функция для создания сущности
  const createItem = (id, name, calories) => {
    return { id, name, calories };
  };

  // Состояние
  const data = {
    items: storageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0,
  };

  // Общие методы для контроля динамических данных
  return {
    getItems: () => {
      return data.items;
    },
    addItem: (name, calories) => {
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      calories = parseInt(calories);

      let newItem = createItem(ID, name, calories);

      data.items.push(newItem);

      return newItem;
    },
    getItemById: (id) => {
      return data.items.find((item) => item.id === id) || null;
    },
    updateItem: (name, calories) => {
      calories = parseInt(calories);

      const foundItem = data.items.find(
        (item) => item.id === data.currentItem.id
      );

      if (foundItem) {
        foundItem.name = name;
        foundItem.calories = calories;
        return foundItem;
      }

      return null;
    },
    deleteItem: (id) => {
      const index = data.items.findIndex((item) => item.id === id);

      if (index !== -1) {
        data.items.splice(index, 1);
      }
    },
    clearAllItems: () => {
      data.items = [];
    },
    setCurrentItem: (item) => {
      data.currentItem = item;
    },
    getCurrentItem: () => {
      return data.currentItem;
    },
    getTotalCalories: () => {
      let total = 0;

      data.items.forEach((item) => {
        total += item.calories;
      });

      data.totalCalories = total;

      return data.totalCalories;
    },
    logData: () => {
      return data;
    },
  };
})();
