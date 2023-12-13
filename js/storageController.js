export const storageCtrl = {
  storeItem: (item) => {
    let items;
    // Проверить есть ли уже данные в хранилище
    if (localStorage.getItem("items") === null) {
      items = [];
      // Добавь новый item, если есть
      items.push(item);
      // Set ls
      localStorage.setItem("items", JSON.stringify(items));
    } else {
      // Получаем то что уже есть хранилище
      items = JSON.parse(localStorage.getItem("items"));

      // И добавляем новую сущность
      items.push(item);

      // Обновляем содержимое хранилища
      localStorage.setItem("items", JSON.stringify(items));
    }
  },
  getItemsFromStorage: () => {
    let items;
    if (localStorage.getItem("items") === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
  },
  updateItemStorage: (updatedItem) => {
    let items = JSON.parse(localStorage.getItem("items"));

    items.forEach((item, index) => {
      if (updatedItem.id === item.id) {
        items.splice(index, 1, updatedItem);
      }
    });
    localStorage.setItem("items", JSON.stringify(items));
  },
  deleteItemFromStorage: (id) => {
    let items = JSON.parse(localStorage.getItem("items"));

    items.forEach((item, index) => {
      if (id === item.id) {
        items.splice(index, 1);
      }
    });
    localStorage.setItem("items", JSON.stringify(items));
  },
  clearItemsFromStorage: () => {
    localStorage.removeItem("items");
  },
};
