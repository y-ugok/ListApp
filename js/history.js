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
