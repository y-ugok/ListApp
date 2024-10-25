document.addEventListener("DOMContentLoaded", function () {
  // ダイアログとボタンの参照を取得
  const resetDialog = document.getElementById("reset-dialog");
  const resetButton = document.getElementById("reset-btn");
  const cancelResetButton = document.getElementById("cancel-reset");
  const confirmResetButton = document.getElementById("confirm-reset");

  // 初期化ボタンが押された時に確認ダイアログを表示
  resetButton.addEventListener("click", () => {
    resetDialog.showModal();
  });

  // キャンセルボタンが押された時にダイアログを閉じる
  cancelResetButton.addEventListener("click", () => {
    resetDialog.close();
  });

  // OKボタンが押された時にローカルストレージを初期化
  confirmResetButton.addEventListener("click", () => {
    // ローカルストレージから全データを削除
    sessionStorage.clear();
    localStorage.clear();
    loadDefaultList();
    // 初期状態で設定されたデフォルトのリストデータが再度読み込まれる
    // ダイアログを閉じる
    resetDialog.close();

    // 初期化完了のメッセージを表示するか、ページをリロードして変更を反映
    alert("データを初期化しました");
    location.reload();
  });

  resetDialog.addEventListener("click", (event) => {
    if (event.target === resetDialog) {
      resetDialog.close();
    }
  });

  //===== 色の変化モーダル =====//
  const colorModal = document.getElementById("colorModal");
  const colorButton = document.getElementById("colorButton");
  const colorClose = document.getElementById("colorClose");

  colorButton.addEventListener("click", show);

  function show() {
    colorModal.classList.add("show-from");
    colorModal.showModal();
    requestAnimationFrame(() => {
      colorModal.classList.remove("show-from");
    });
  }

  colorModal.addEventListener("click", (event) => {
    if (event.target === colorModal) {
      close();
    }
  });

  colorClose.addEventListener("click", close);
  function close() {
    colorModal.classList.add("hide-to");
    colorModal.addEventListener(
      "transitionend",
      () => {
        colorModal.classList.remove("hide-to");
        colorModal.close();
      },
      { once: true }
    );
  }

  // == テーマカラーの適用 ==//
  window.addEventListener("load", () => {
    let savedColor = localStorage.getItem("themeColor");

    if (!savedColor) {
      savedColor = "#FFC3B7"; // デフォルトの色
    }

    // テーマカラーを適用
    applyThemeColor(savedColor);
  });

  // テーマカラーの適用関数
  function applyThemeColor(color) {
    localStorage.setItem("themeColor", color); // 選択した色をローカルストレージに保存
    document.querySelector("header").style.backgroundColor = color;
    document.getElementById("confirm-reset").style.backgroundColor = color;
    // document.getElementById("del-item-btn").style.backgroundColor = color;
    const rectangles = document.querySelectorAll(".rectangle");
    const removeButtons = document.querySelectorAll(".remove-btn");
    rectangles.forEach((rect) => {
      rect.style.backgroundColor = color;
    });
    removeButtons.forEach((btn) => {
      btn.style.backgroundColor = color;
    });
  }

  // カラーボタンのクリックイベント
  document.querySelectorAll(".wrapper button").forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelectorAll(".wrapper button").forEach((btn) => {
        btn.textContent = "適用";
        btn.classList.remove("selected-button");
      });

      this.textContent = "適用中";
      this.classList.add("selected-button");

      let selectedColor;
      switch (this.id) {
        case "red":
          selectedColor = "#FFBDB1"; // 赤色
          break;
        case "yellow":
          selectedColor = "#FFEC9B"; // 黄色
          break;
        case "green":
          selectedColor = "#BFF0B1"; // 緑色
          break;
        case "blue":
          selectedColor = "#B1D4FF"; // 青色
          break;
        default:
          selectedColor = "#FFC3B7"; // デフォルトカラー
      }

      // テーマカラーを適用し、ローカルストレージに保存
      applyThemeColor(selectedColor);
    });
  });
});
