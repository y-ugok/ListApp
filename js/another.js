// another.html 用のスクリプト
function loadList() {
  const listKey = "self-list";
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

  // アイテムを表示
  storedItems.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add(item.icon);
    li.innerHTML = `
      <span class="list-flex">
        <span class="text">${item.text}</span>
        <img src="./img/dots.png" />
      </span>
      <button><img src="./img/check-icon.png" /></button>
    `;
    ul.appendChild(li);
  });
}

window.onload = loadList;
