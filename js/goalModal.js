export const goalDialogModal = () => {
  const openButton = document.getElementById("goal-button");
  const cancelButton = document.getElementById("cancel-dialog");
  const dialog = document.getElementById("daily-goal");

  // Update button opens a modal dialog
  openButton.addEventListener("click", () => {
    dialog.showModal();
  });

  // Form cancel button closes the dialog box
  cancelButton.addEventListener("click", () => {
    dialog.close();
  });
};
