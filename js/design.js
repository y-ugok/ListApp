// ページ読み込み時に保存されたテーマカラーを適用
window.addEventListener("load", () => {
  let savedColor = localStorage.getItem("themeColor");

  if (!savedColor) {
    savedColor = "#FFC3B7";
  }
  applyThemeColor(savedColor);

  //リストアイテムを追加して更新すると色がデフォルトに戻る問題の解消
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

  const confirmReset = document.getElementById("confirm-reset");
  if (confirmReset) {
    confirmReset.style.backgroundColor = color;
  }
}

// レスポンシブ化
if (window.matchMedia("(min-width: 481px)").matches) {
  // モーダルの表示位置を変更
  document.addEventListener("DOMContentLoaded", () => {
    // ------ リストアイテム追加モーダル ------ //
    const openButton = document.getElementById("open"); // モーダルを開くボタン
    const registerDialog = document.getElementById("register-dialog"); // モーダル
    const footer = document.querySelector("footer");

    // フッターの終わりの位置を取得
    function updateDialogPosition() {
      const footerHeight = footer.clientHeight;
      registerDialog.style.bottom = `${footerHeight}px`; // フッターの高さ分だけ下に配置
      registerDialog.style.height = `80vh`;
      registerDialog.style.width = `50%`;
    }

    // // モーダルを開く
    openButton.addEventListener("click", () => {
      updateDialogPosition();
      registerDialog.showModal(); // モーダルを開く
    });

    // モーダルを閉じる
    document.getElementById("register-close").addEventListener("click", () => {
      registerDialog.close(); // モーダルを閉じる
    });

    // ウィンドウサイズ変更時に再計算
    window.addEventListener("resize", updateDialogPosition);
  });
} else if (window.matchMedia("(min-width:960px)").matches) {
  //PC処理
  registerDialog.style.width = `280px`;
}
