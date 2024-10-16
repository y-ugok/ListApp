'use strict';

const openButton = document.getElementById('open');
const closeButton = document.getElementById('close');
const addButton = document.getElementById('add-item-btn');
const iconType = document.getElementById('icon-type');
const listText = document.getElementById('item-content');
const dialog = document.querySelector('dialog');
let editMode = false; // 編集モードを管理する変数
let editTargetItem = null; // 編集対象のアイテムを保存するための変数

// ページに応じてlistKeyを決定
function getListKey() {
  if (window.location.pathname.includes('self.html')) {
    return 'self-list'; // self.html の場合は self-list を使う
  } else {
    return 'partner-list'; // partner.html の場合は partner-list を使う
  }
}

// // 開くボタンをクリックされた時
// document.querySelector("#open").addEventListener("click", show);

function show() {
  // モーダル表示前にクラスを付与
  dialog.classList.add('show-from');
  dialog.showModal();

  requestAnimationFrame(() => {
    // モーダル表示後にクラスを削除してアニメーションを開始
    dialog.classList.remove('show-from');
  });
}

// ダイアログを開く・閉じる
openButton.addEventListener('click', () => {
  // フィールドをリセットする処理
  iconType.value = 'cook'; // デフォルトのアイコンタイプにリセット
  listText.value = ''; // テキストフィールドを空にする
  dialog.classList.remove('hidden');
  dialog.showModal();
});

closeButton.addEventListener('click', () => {
  dialog.close();
});

// 開くボタンをクリックされた時
document.querySelector('#open').addEventListener('click', show);

function show() {
  // モーダル表示前にクラスを付与
  dialog.classList.add('show-from');
  dialog.showModal();

  requestAnimationFrame(() => {
    // モーダル表示後にクラスを削除してアニメーションを開始
    dialog.classList.remove('show-from');
  });
}

// セッションストレージにアイテムを保存
function saveTosessionStorage(item) {
  const listKey = getListKey(); // 現在のページに基づいてlistKeyを取得
  let storedItems = JSON.parse(sessionStorage.getItem(listKey)) || [];
  storedItems.unshift(item);
  sessionStorage.setItem(listKey, JSON.stringify(storedItems));
}

// セッションストレージからアイテムを削除
function removeFromsessionStorage(itemText) {
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
  const ul = document.getElementById('list');

  // 追加すると二重に表示されないようにする
  ul.textContent = '';

  // 追加すると二重に表示されないようにする
  ul.textContent = '';
  storedItems.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add(item.icon);
    if (listKey === 'self-list') {
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
      <button class="remove-btn" onclick="completeTask()"><img src="./img/check-icon.png" /></button>
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
   <button class="remove-btn" onclick="completeTask()"><img src="./img/check-icon.png" /></button>
 `;
    }
    ul.appendChild(li);
  });

  // アイテム削除ボタンのクリックイベントを追加
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const li = event.target.closest('li');
      const itemText = li.querySelector('.text').textContent;

      // DOMから削除
      li.remove();

      // セッションストレージから削除
      removeFromsessionStorage(itemText);
    });
  });
  addDotsFunctionality(); // リストを読み込んだ後に追加
}

function addDotsFunctionality() {
  const dotIcons = document.querySelectorAll('li img[src="./img/dots.png"]');

  dotIcons.forEach((dotIcon) => {
    dotIcon.addEventListener('click', (event) => {
      const itemElement = event.target.closest('li');
      editMode = true; // 編集モードに切り替える
      editTargetItem = itemElement; // 編集対象のリストアイテムを保持

      // ダイアログに既存のリストアイテムの内容をセット
      const itemText = itemElement.querySelector('.text').textContent;
      const itemIcon = itemElement.classList.contains('cook')
        ? 'cook'
        : itemElement.classList.contains('communication')
        ? 'communication'
        : itemElement.classList.contains('action')
        ? 'action'
        : 'shopping';

      iconType.value = itemIcon; // アイコンタイプを設定
      listText.value = itemText; // リストの内容を設定

      // 削除ボタンのクリックイベント
      const deleteButton = document.getElementById('del-item-btn');
      deleteButton.addEventListener('click', () => {
        const itemText = itemElement.querySelector('.text').textContent;
        itemElement.remove(); // DOMから削除
        removeFromsessionStorage(itemText); // セッションストレージから削除
        dialog.close();
      });

      dialog.showModal(); // ダイアログを開く
    });
  });
}

// アイテム追加ボタンの処理
addButton.addEventListener('click', () => {
  // バリデーション: リストアイテムの内容が空の場合は追加を許可しない
  if (!listText.value.trim()) {
    alert('リストアイテムの内容を入力してください。');
    return; // 処理を終了する
  }
  const newItem = {
    icon: iconType.value,
    text: listText.value
  };
  if (editMode && editTargetItem) {
    // 編集モードの場合、リストアイテムを更新する
    const oldText = editTargetItem.querySelector('.text').textContent;
    updatesessionStorageItem(oldText, newItem); // セッションストレージのアイテムを更新
    editTargetItem.querySelector('.text').textContent = newItem.text; // リストのテキストを更新
    editTargetItem.className = newItem.icon; // アイコンのクラスを更新
  } else {
    // 通常の新規追加処理
    saveTosessionStorage(newItem);
  }
  dialog.close(); // ダイアログを閉じる
  editMode = false; // 編集モードをリセット
  editTargetItem = null; // 編集対象のアイテムをリセット
  loadList();
});
// セッションストレージのアイテムを更新する関数
function updatesessionStorageItem(oldText, newItem) {
  const listKey = getListKey(); // 現在のページに基づいてlistKeyを取得
  let storedItems = JSON.parse(sessionStorage.getItem(listKey)) || [];

  // 古いアイテムを探して更新
  storedItems = storedItems.map((item) => {
    if (item.text === oldText) {
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
  const plantImage = document.getElementById('plantImage');
  console.log(completedTasks);
  if (completedTasks >= 0 && completedTasks <= 2) {
    plantImage.src = './img/plant1.png';
  } else if (completedTasks >= 3 && completedTasks <= 5) {
    plantImage.src = './img/plant2.png';
  } else if (completedTasks >= 6 && completedTasks <= 8) {
    plantImage.src = './img/plant3.png';
  } else if (completedTasks >= 9 && completedTasks <= 11) {
    plantImage.src = './img/plant4.png';
  } else {
    plantImage.src = './img/plant5.png';
  }
}

// === 植物の成長の画像変化用のコードここまで === //

// テーマカラーの変更ダイアログ
// const themeColor = document.getElementById("themecolor");
// const colorModal = document.getElementById("themecolorModal");
// themeColor.addEventListener("click", showColorModal);
// function showColorModal() {
//   colorModal.classList.add("show-from");
//   colorModal.showModal();
//   requestAnimationFrame(() => {
//     // モーダル表示後にクラスを削除してアニメーションを開始
//     dialog.classList.remove("show-from");
//   });
// }
