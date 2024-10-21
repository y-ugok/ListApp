// ページ読み込み時に保存されたテーマカラーを適用
window.addEventListener("load", () => {
  // ローカルストレージからテーマカラーを取得

  let savedColor = localStorage.getItem("themeColor");

  // ローカルストレージに値がない場合はデフォルトの色 "#FFC3B7" を設定
  if (!savedColor) {
    savedColor = "#FFC3B7"; // デフォルトの色
  }
  // テーマカラーを適用
  applyThemeColor(savedColor);
});

// == テーマカラーの適用 == //
function applyThemeColor(color) {
  // ヘッダーや他の要素に選択されたテーマカラーを適用
  document.querySelector('header').style.backgroundColor = color;
　const completeButtons = document.getElementsByClassName("complete-btn");
　Array.from(completeButtons).forEach((btn) => {
  btn.style.backgroundColor = color;
　});
  const rectangles = document.querySelectorAll('.rectangle');
  const removeButtons = document.querySelectorAll('.remove-btn');
  rectangles.forEach((rect) => {
    rect.style.backgroundColor = color;
  });
  removeButtons.forEach((btn) => {
    btn.style.backgroundColor = color;
  });
  // addStyleクラスの下線の色を変更
  const addStyleElements = document.querySelectorAll('.addStyle');
  addStyleElements.forEach((elem) => {
    elem.style.borderBottomColor = color; // 下線の色をテーマカラーに設定
  });
  console.log(color); // 取得したテーマカラーを確認
}
