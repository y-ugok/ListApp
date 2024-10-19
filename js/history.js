'use strict';

// ページに応じてlistKeyを決定
function getWho() {
  if (window.location.pathname.includes('history-self.html')) {
    return 'self';
  } else {
    return 'partner';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let storedItems = JSON.parse(sessionStorage.getItem('history-list')).reverse() || [];
  const ul = document.getElementById('list');
  ul.textContent = '';

  const who = getWho();
  const history = storedItems.filter((item) => item.who == who);
  history.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <li>
      <div class="list-flex">
        <div class="list-content"><span class="text">${item.action}</span>         
        </div>
        <span class="time">${item.date}</span>
      </div>
    </li>
    `;
    ul.appendChild(li);
  });
});

function registerHistory({ who, item }) {
  const historyItems = JSON.parse(sessionStorage.getItem('history-list')) || [];
  const now = new Date().toLocaleString('ja-JP');
  historyItems.push({
    who: who,
    type: '完了',
    action: `私がパートナーにしてほしいことリストに「${item}」を登録`,
    date: now,
  });
  sessionStorage.setItem('history-list', JSON.stringify(historyItems));
}

function updateHistory({ who, oldItem, newItem }) {
  const historyItems = JSON.parse(sessionStorage.getItem('history-list')) || [];
  const now = new Date().toLocaleString('ja-JP');
  historyItems.push({
    who: who,
    type: '更新',
    action: `自分がパートナーにしてほしいことリストの「${oldItem}」を「${newItem}」に更新`,
    date: now,
  });
  sessionStorage.setItem('history-list', JSON.stringify(historyItems));
}

function removeHistory({ who, item }) {
  const historyItems = JSON.parse(sessionStorage.getItem('history-list')) || [];
  const now = new Date().toLocaleString('ja-JP');
  historyItems.push({
    who: who,
    type: '削除',
    action: `自分がパートナーにしてほしいことリストの「${item}」を削除`,
    date: now,
  });
  sessionStorage.setItem('history-list', JSON.stringify(historyItems));
}

function completeHistory({ who, item }) {
  const historyItems = JSON.parse(sessionStorage.getItem('history-list')) || [];
  const now = new Date().toLocaleString('ja-JP');
  historyItems.push({
    who: who,
    type: '完了',
    action: `パートナーが私にしてほしいことリストの「${item}」を完了`,
    date: now,
  });
  sessionStorage.setItem('history-list', JSON.stringify(historyItems));
}