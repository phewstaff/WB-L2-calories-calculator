import { storageCtrl } from "./storageController.js";
import { ItemCtrl } from "./item-controller";
import { UICtrl } from "./ui-controller";
import { goalDialogModal } from "./goalModal.js";

const App = (function (ItemCtrl, storageCtrl, UICtrl) {
  const loadEventListeners = () => {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState);

    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItemsClick);

    document
      .querySelector(UISelectors.addDailyGoalBtn)
      .addEventListener("click", goalAddSubmit);
  };

  // Общие методы App
  return {
    init: () => {
      // Очистка edit инпутов
      UICtrl.clearEditState();

      // Получаем актуальные данные
      const items = ItemCtrl.getItems();

      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Отображаем актуальные данные на странице
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      const dailyGoal = storageCtrl.getGoalFromStorage();
      // Add daily goal
      UICtrl.showDailyGoal(dailyGoal);

      // Add progress to UI
      UICtrl.showProgress(dailyGoal, totalCalories);

      // Инициализация event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, storageCtrl, UICtrl);

// Инициализация App
App.init();
// Инициализация модалки
goalDialogModal();
