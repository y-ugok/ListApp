"use strict";
const openButton =
  document.getElementById("open") || document.getElementById("open-disabled");
const registerDialog = document.querySelector("#register-dialog");
const registerButton = document.getElementById("register-item-btn");
const registerCloseButton = document.getElementById("register-close");
const editDialog = document.querySelector("#edit-dialog");
const updateButton = document.getElementById("update-item-btn");
const deleteButton = document.getElementById("del-item-btn");
const editCloseButton = document.getElementById("edit-close");
const iconType = document.getElementById("icon-type");
const listText = document.getElementById("item-content");
const newIconType = document.getElementById("new-icon-type");
const newListText = document.getElementById("new-item-content");

let editTargetItem = null; // 編集対象のアイテムを保存するための変数

// ページに応じてlistKeyを決定
function getListKey() {
  if (window.location.pathname.includes("self.html")) {
    return "self-list"; // self.html の場合は self-list を使う
  } else {
    return "partner-list"; // partner.html の場合は partner-list を使う
  }
}

// ダイアログを開く・閉じる
openButton.addEventListener("click", () => {
  // モーダル表示前にクラスを付与
  registerDialog.classList.add("show-from");
  registerDialog.showModal();

  requestAnimationFrame(() => {
    // モーダル表示後にクラスを削除してアニメーションを開始
    registerDialog.classList.remove("show-from");
  });
});

function show() {
  registerDialog.classList.add("show-from");
  registerDialog.showModal();

  requestAnimationFrame(() => {
    // モーダル表示後にクラスを削除してアニメーションを開始
    registerDialog.classList.remove("show-from");
  });
}
registerCloseButton.addEventListener("click", () => {
  // モーダル非表示前にクラスを付与してアニメーションを開始
  registerDialog.classList.add("hide-to");

  registerDialog.addEventListener(
    "transitionend",
    () => {
      // アニメーション終了後にクラスを削除し、モーダルを閉じる
      registerDialog.classList.remove("hide-to");
      registerDialog.close();
    },
    {
      once: true,
    }
  );
});
registerDialog.addEventListener("click", (event) => {
  if (event.target === registerDialog) {
    registerDialog.close();
  }
});
editCloseButton.addEventListener("click", () => {
  editDialog.close();
});

// セッションストレージにアイテムを保存
function saveToSessionStorage(item) {
  const listKey = getListKey(); // 現在のページに基づいてlistKeyを取得
  let storedItems = JSON.parse(sessionStorage.getItem(listKey)) || [];
  storedItems.unshift(item);
  sessionStorage.setItem(listKey, JSON.stringify(storedItems));

  // 履歴を更新（in history.js）
  registerHistory(item.text);
}

// セッションストレージからアイテムを削除;
function removeFromSessionStorage(itemText) {
  const listKey = getListKey(); // 現在のページに基づいてlistKeyを取得
  let storedItems = JSON.parse(sessionStorage.getItem(listKey)) || [];
  // テキストに基づいてアイテムを削除
  storedItems = storedItems.filter((item) => item.text !== itemText);
  sessionStorage.setItem(listKey, JSON.stringify(storedItems));
}

// 初期データの読み込みと表示
function loadList() {
  // defaultList.js
  loadDefaultList();

  const listKey = getListKey(); // 現在のページに基づいてlistKeyを取得
  let storedItems = JSON.parse(sessionStorage.getItem(listKey)) || [];

  const ul = document.getElementById("list");
  ul.textContent = ""; // 二重に表示されないようにする

  storedItems.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add(item.icon);
    if (listKey === "self-list") {
      li.innerHTML = `
         <div class="wrapper">
         <div class="rectangle">
          <img src="./img/${item.icon}.png" alt="${item.icon}" />
          </div>
        </div>
      <span class="list-flex">
          <span class="text">${item.text}</span>
          <img src="./img/dots.png">
      </span>
    `;
    } else {
      li.innerHTML = `
      <div class="wrapper">
      <div class="rectangle">
       <img src="./img/${item.icon}.png" alt="${item.icon}" />
       </div>
     </div>
   <span class="list-flex">
       <span class="text">${item.text}</span>
   </span>
   <button class="complete-btn" onclick="completeTask()"><img src="./img/check-icon.png" /></button>
 `;
    }
    ul.appendChild(li);
  });

  // アイテム削除ボタンのクリックイベントを追加
  const completeButtons = document.querySelectorAll(".complete-btn");
  completeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const li = event.target.closest("li");
      const itemText = li.querySelector(".text").textContent;
      // セッションストレージから削除
      removeFromSessionStorage(itemText);
      // 履歴に記録（in history.js）
      completeHistory(itemText);
      // DOMから削除
      li.remove();
    });
  });
  addDotsFunctionality(); // リストを読み込んだ後に追加
}

function addDotsFunctionality() {
  const dotIcons = document.querySelectorAll('li img[src="./img/dots.png"]');

  dotIcons.forEach((dotIcon) => {
    dotIcon.addEventListener("click", (event) => {
      const itemElement = event.target.closest("li");
      editTargetItem = itemElement; // 編集対象のリストアイテムを保持

      // ダイアログに既存のリストアイテムの内容をセット
      const itemText = itemElement.querySelector(".text").textContent;
      const itemIcon = itemElement.classList.contains("cook")
        ? "cook"
        : itemElement.classList.contains("communication")
        ? "communication"
        : itemElement.classList.contains("action")
        ? "action"
        : "shopping";

      iconType.value = itemIcon; // アイコンタイプを設定
      listText.value = itemText; // リストの内容を設定

      deleteButton.addEventListener("click", () => {
        itemElement.remove();
      });
      // == モーダルを表示する==//
      editDialog.classList.add("show-from");
      editDialog.showModal();

      requestAnimationFrame(() => {
        // モーダル表示後にクラスを削除してアニメーションを開始
        editDialog.classList.remove("show-from");
      });
    });
  });
}
/* 背景をクリックした時に編集ダイアログを閉じる */
editDialog.addEventListener("click", (event) => {
  // 背景がクリックされた場合は閉じる。
  // ダイアログの見た目のスタイルは .inner に設定しているので、
  // コンテンツ部分がクリックされた場合、target は必ず .inner かその子孫要素になる。
  // したがって、target === dialog の時は背景がクリックされたとみなせる。
  if (event.target === editDialog) {
    editDialog.close();
  }
});
// 削除ボタンのクリックイベント
deleteButton.addEventListener("click", () => {
  removeFromSessionStorage(listText.value); // セッションストレージから削除
  removeHistory(listText.value); // 履歴を更新（in history.js）
  // listText.remove(); // DOMから削除
  editDialog.close();
});

// アイテム更新ボタンの処理
updateButton.addEventListener("click", () => {
  // バリデーション: リストアイテムの内容が空の場合は追加を許可しない
  if (!listText.value.trim()) {
    alert("リストアイテムの内容を入力してください。");
    return; // 処理を終了する
  }
  const newItem = {
    icon: iconType.value,
    text: listText.value,
  };

  // 編集モードの場合、リストアイテムを更新する
  const oldText = editTargetItem.querySelector(".text").textContent;

  if (oldText === listText.value) {
    alert("アイテムの内容が同じです");
    return; // 処理を終了する
  }

  updateSessionStorageItem(oldText, newItem); // セッションストレージのアイテムを更新
  editTargetItem.querySelector(".text").textContent = newItem.text; // リストのテキストを更新
  editTargetItem.className = newItem.icon; // アイコンのクラスを更新

  editDialog.close(); // ダイアログを閉じる
  editTargetItem = null; // 編集対象のアイテムをリセット
  loadList();
});

// アイテム追加ボタンの処理
registerButton.addEventListener("click", () => {
  // バリデーション: リストアイテムの内容が空の場合は追加を許可しない
  if (!newListText.value.trim()) {
    alert("リストアイテムの内容を入力してください。");
    return; // 処理を終了する
  }
  const newItem = {
    icon: newIconType.value,
    text: newListText.value,
  };

  // 新規追加処理
  saveToSessionStorage(newItem);

  registerDialog.close(); // ダイアログを閉じる
  loadList();
});

// セッションストレージのアイテムを更新する関数
function updateSessionStorageItem(oldText, newItem) {
  const listKey = getListKey(); // 現在のページに基づいてlistKeyを取得
  let storedItems = JSON.parse(sessionStorage.getItem(listKey)) || [];

  // 古いアイテムを探して更新
  storedItems = storedItems.map((item) => {
    if (item.text === oldText) {
      // 履歴を更新（in history.js）
      updateHistory(oldText, newItem.text);
      return newItem; // アイテムを新しい内容で更新
    }
    return item;
  });

  sessionStorage.setItem(listKey, JSON.stringify(storedItems));
}

window.onload = () => {
  loadList();
  addDotsFunctionality(); // dots.png の機能を追加
};
// === 植物成長の画像変化用のコード === //
let completedTasks = 0;

function completeTask() {
  completedTasks++;
  updatePlantImage();
}

function updatePlantImage() {
  if (getListKey() === "partner") {
    const plantImage = document.getElementById("plantImage");
    if (completedTasks >= 0 && completedTasks <= 2) {
      plantImage.src = "./img/plant1.png";
    } else if (completedTasks >= 3 && completedTasks <= 5) {
      plantImage.src = "./img/plant2.png";
    } else if (completedTasks >= 6 && completedTasks <= 8) {
      plantImage.src = "./img/plant3.png";
    } else if (completedTasks >= 9 && completedTasks <= 11) {
      plantImage.src = "./img/plant4.png";
    } else {
      plantImage.src = "./img/plant5.png";
    }
  }
}
