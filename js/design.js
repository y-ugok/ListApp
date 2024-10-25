// ページ読み込み時に保存されたテーマカラーを適用
window.addEventListener("load", () => {
  let savedColor = localStorage.getItem("themeColor");

  if (!savedColor) {
    savedColor = "#FFC3B7"; // デフォルトの色
  }
  applyThemeColor(savedColor);

  // ボタンのクリックイベントを追加
  const updateButton = document.getElementById("update-item-btn");
  const registerButton = document.getElementById("register-item-btn");

  if (updateButton) {
    updateButton.addEventListener("click", () => applyThemeColor(savedColor));
  }
  if (registerButton) {
    registerButton.addEventListener("click", () => applyThemeColor(savedColor));
  }
});

// == テーマカラーの適用 == //
function applyThemeColor(color) {
  const openButton = document.getElementById("open");
  if (openButton) {
    openButton.style.backgroundColor = color;
  }
  document.querySelector("header").style.backgroundColor = color;

  const registerItemBtn = document.getElementById("register-item-btn");
  if (registerItemBtn) {
    registerItemBtn.style.backgroundColor = color;
  }

  const delItemBtn = document.getElementById("del-item-btn");
  if (delItemBtn) {
    delItemBtn.style.color = color;
  }

  const updateButton = document.getElementById("update-item-btn");
  if (updateButton) {
    updateButton.style.backgroundColor = color;
  }

  const completeButtons = document.getElementsByClassName("complete-btn");
  Array.from(completeButtons).forEach((btn) => {
    btn.style.backgroundColor = color;
  });

  const rectangles = document.querySelectorAll(".rectangle");
  rectangles.forEach((rect) => {
    rect.style.backgroundColor = color;
  });

  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((btn) => {
    btn.style.backgroundColor = color;
  });

  const addStyleElements = document.querySelectorAll(".addStyle");
  addStyleElements.forEach((elem) => {
    elem.style.borderBottomColor = color; // 下線の色をテーマカラーに設定
  });
  console.log(color); // 取得したテーマカラーを確認
}
