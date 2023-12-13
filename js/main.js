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

  const itemAddSubmit = (e) => {
    // Получить входные данные формы из контроллера UI
    const input = UICtrl.getItemInput();

    // Проверить наличие ввода имени и калорий
    if (input.name !== "" && input.calories !== "") {
      // Добавить элемент
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Добавить элемент в список UI
      UICtrl.addListItem(newItem);

      // Получить общее количество калорий
      const totalCalories = ItemCtrl.getTotalCalories();
      // Отобразить общее количество калорий в UI
      UICtrl.showTotalCalories(totalCalories);
      UICtrl.showProgress(undefined, totalCalories);

      // Сохранить в localStorage
      storageCtrl.storeItem(newItem);

      // Очистить поля
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  const goalAddSubmit = (e) => {
    // Получить входные данные формы из контроллера UI
    const goalInput = UICtrl.getGoalInput();

    if (goalInput) {
      UICtrl.showDailyGoal(goalInput);

      // Сохранить в localStorage
      storageCtrl.storeGoal(goalInput);
    }

    UICtrl.showProgress(goalInput);
    const dialog = document.getElementById("daily-goal");
    dialog.close();
    e.preventDefault();
  };

  // нажатие на кнопку редактирования элемента
  const itemEditClick = (e) => {
    if (e.target.classList.contains("edit-item")) {
      // Получить идентификатор элемента списка (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      // Разбить на массив
      const listIdArr = listId.split("-");

      // Получить фактический идентификатор
      const id = parseInt(listIdArr[1]);

      // Получить элемент
      const itemToEdit = ItemCtrl.getItemById(id);

      // Установить текущий элемент
      ItemCtrl.setCurrentItem(itemToEdit);

      // Добавить элемент в форму
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  };

  // Обновить отправку элемента
  const itemUpdateSubmit = (e) => {
    // Получить ввод элемента
    const input = UICtrl.getItemInput();

    // Обновить элемент
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Обновить пользовательский интерфейс
    UICtrl.updateListItem(updatedItem);

    // Получить общее количество калорий
    const totalCalories = ItemCtrl.getTotalCalories();
    // Отобразить общее количество калорий в UI
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.showProgress(undefined, totalCalories);

    // Обновить хранилище локальных данных
    storageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Событие кнопки удаления
  const itemDeleteSubmit = (e) => {
    // Получить текущий элемент
    const currentItem = ItemCtrl.getCurrentItem();

    // Удалить из структуры данных
    ItemCtrl.deleteItem(currentItem.id);

    // Удалить из UI
    UICtrl.deleteListItem(currentItem.id);

    storageCtrl.deleteItemFromStorage(currentItem.id);
    // Получить общее количество калорий
    const totalCalories = ItemCtrl.getTotalCalories();
    // Отобразить общее количество калорий в UI
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.showProgress(undefined, totalCalories);
    // Удалить из хранилища локальных данных

    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Событие очистки всех элементов
  const clearAllItemsClick = () => {
    // Удалить все элементы из структуры данных
    ItemCtrl.clearAllItems();

    // Получить общее количество калорий
    const totalCalories = ItemCtrl.getTotalCalories();
    // Отобразить общее количество калорий в UI
    UICtrl.showTotalCalories(totalCalories);

    // Удалить из UI
    UICtrl.removeItems();

    UICtrl.showProgress(undefined, totalCalories);

    // Очистить из хранилища локальных данных
    storageCtrl.clearItemsFromStorage();

    // Скрыть UL
    UICtrl.hideList();
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
