'use strict';

function loadHistory() {
  let storedItems =
    JSON.parse(sessionStorage.getItem('history-list')).reverse() || [];
  const ul = document.getElementById('list');
  ul.textContent = '';

  storedItems.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="list-flex">
        <div class="list-content"><span class="text">${item.action}</span>         
        </div>
        <span class="time">${item.date}</span>
      </div>
    `;
    ul.appendChild(li);
  });
}

function registerHistory(item) {
  const historyItems = JSON.parse(sessionStorage.getItem('history-list')) || [];
  const now = new Date().toLocaleString('ja-JP');
  historyItems.push({
    type: '登録',
    action: `私がパートナーにしてほしいことリストに「${item}」を登録`,
    date: now,
  });
  sessionStorage.setItem('history-list', JSON.stringify(historyItems));
}

function updateHistory(oldItem, newItem) {
  const historyItems = JSON.parse(sessionStorage.getItem('history-list')) || [];
  const now = new Date().toLocaleString('ja-JP');
  historyItems.push({
    type: '更新',
    action: `私がパートナーにしてほしいことリストの「${oldItem}」を「${newItem}」に更新`,
    date: now,
  });
  sessionStorage.setItem('history-list', JSON.stringify(historyItems));
}

function removeHistory(item) {
  const historyItems = JSON.parse(sessionStorage.getItem('history-list')) || [];
  const now = new Date().toLocaleString('ja-JP');
  historyItems.push({
    type: '削除',
    action: `私がパートナーにしてほしいことリストの「${item}」を削除`,
    date: now,
  });
  sessionStorage.setItem('history-list', JSON.stringify(historyItems));
}

function completeHistory(item) {
  const historyItems = JSON.parse(sessionStorage.getItem('history-list')) || [];
  const now = new Date().toLocaleString('ja-JP');
  historyItems.push({
    type: '完了',
    action: `パートナーが私にしてほしいことリストの「${item}」を完了`,
    date: now,
  });
  sessionStorage.setItem('history-list', JSON.stringify(historyItems));
}
