const dialog = document.querySelector("dialog");
const openButton = document.getElementById("open");
const closeButton = document.getElementById("close");
const addButton = document.getElementById("add-item-btn");

const listType = document.getElementById("list-type");
const iconType = document.getElementById("icon-type");
const listText = document.getElementById("item-content");

// ページに応じてlistKeyを決定
function getListKey() {
  if (window.location.pathname.includes("another.html")) {
    return "self-list"; // another.html の場合は self-list を使う
  } else {
    return "partner-list"; // index.html の場合は partner-list を使う
  }
}

// 開くボタンをクリックされた時
document.querySelector("#open").addEventListener("click", show);

function show() {
  // モーダル表示前にクラスを付与
  dialog.classList.add("show-from");
  dialog.showModal();

  requestAnimationFrame(() => {
    // モーダル表示後にクラスを削除してアニメーションを開始
    dialog.classList.remove("show-from");
  });
}

// ダイアログを開く・閉じる
openButton.addEventListener("click", () => {
  // フィールドをリセットする処理
  listType.value = "partner"; // デフォルトのリストタイプにリセット
  iconType.value = "cook"; // デフォルトのアイコンタイプにリセット
  listText.value = ""; // テキストフィールドを空にする
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

// 開くボタンをクリックされた時
document.querySelector("#open").addEventListener("click", show);

function show() {
  // モーダル表示前にクラスを付与
  dialog.classList.add("show-from");
  dialog.showModal();

  requestAnimationFrame(() => {
    // モーダル表示後にクラスを削除してアニメーションを開始
    dialog.classList.remove("show-from");
  });
}
// アイテム追加ボタンの処理
addButton.addEventListener("click", () => {
  // バリデーション: リストアイテムの内容が空の場合は追加を許可しない
  if (!listText.value.trim()) {
    alert("リストアイテムの内容を入力してください。");
    return; // 処理を終了する
  }
  const newItem = {
    type: listType.value,
    icon: iconType.value,
    text: listText.value,
  };

  // データをローカルストレージに保存
  saveToLocalStorage(newItem);
  loadList();
  dialog.close();
});

// ローカルストレージにアイテムを保存
function saveToLocalStorage(item) {
  const listKey = getListKey(); // 現在のページに基づいてlistKeyを取得
  let storedItems = JSON.parse(localStorage.getItem(listKey)) || [];
  storedItems.push(item);
  localStorage.setItem(listKey, JSON.stringify(storedItems));
}

// ローカルストレージからアイテムを削除
function removeFromLocalStorage(itemText) {
  const listKey = getListKey(); // 現在のページに基づいてlistKeyを取得
  let storedItems = JSON.parse(localStorage.getItem(listKey)) || [];
  // テキストに基づいてアイテムを削除
  storedItems = storedItems.filter((item) => item.text !== itemText);
  localStorage.setItem(listKey, JSON.stringify(storedItems));
}

// 初期データの読み込みと表示
function loadList() {
  const listKey = getListKey(); // 現在のページに基づいてlistKeyを取得
  const ul = document.getElementById(listKey);
  let storedItems = JSON.parse(localStorage.getItem(listKey)) || [];

  // デフォルトのアイテムをローカルストレージに追加
  if (storedItems.length === 0) {
    storedItems = [
      { icon: "cook", text: "自分の好きなご飯をパートナーに作ってもらいたい" },
      { icon: "communication", text: "1日1つ以上誉め言葉をかけてほしい" },
      { icon: "action", text: "疲れている時にマッサージ" },
      {
        icon: "communication",
        text: "1日1回以上は感謝の気持ちを伝えてもらえると嬉しい",
      },
      { icon: "shopping", text: "ショッピングを手伝ってもらいたい" },
    ];
    localStorage.setItem(listKey, JSON.stringify(storedItems));
  }

  // 追加すると二重に表示されないようにする
  ul.textContent = "";

  storedItems.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add(item.icon);
    li.innerHTML = `
        <span class="list-flex">
        <span class="text">${item.text}</span>
        <img src="./img/dots.png" />
      </span>
      <button class="remove-btn"><img src="./img/check-icon.png" /></button>
    `;
    ul.appendChild(li);
  });

  // アイテム削除ボタンのクリックイベントを追加
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const li = event.target.closest("li");
      const itemText = li.querySelector(".text").textContent;

      // DOMから削除
      li.remove();

      // ローカルストレージから削除
      removeFromLocalStorage(itemText);
    });
  });
}

window.onload = loadList;
