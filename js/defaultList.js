'use strict';

function loadDefaultList() {
  // デフォルトのアイテムをセッションストレージに追加
  const selfItems = JSON.parse(sessionStorage.getItem('self-list')) || [];

  if (selfItems.length === 0) {
    const storedItems = [
      {
        icon: 'cook',
        text: '私の好きなご飯をパートナーに作ってもらいたいわ'
      },
      {
        icon: 'communication',
        text: '1日1つ以上誉め言葉をかけてほしいわ'
      },
      { icon: 'action', text: '疲れている時にマッサージしてほしいわ' },
      {
        icon: 'communication',
        text: '1日1回以上は感謝の気持ちを伝えてもらえると嬉しいわ'
      },
      {
        icon: 'shopping',
        text: '買い物を手伝ってもらいたいわ'
      }
    ];
    sessionStorage.setItem('self-list', JSON.stringify(storedItems));
  }

  const partnerItems = JSON.parse(sessionStorage.getItem('partner-list')) || [];

  if (partnerItems.length === 0) {
    const storedItems = [
      {
        icon: 'cook',
        text: '私の好きなご飯をパートナーに作ってもらいたい'
      },
      {
        icon: 'communication',
        text: '1日1つ以上誉め言葉をかけてほしい'
      },
      { icon: 'action', text: '疲れている時にマッサージ' },
      {
        icon: 'communication',
        text: '1日1回以上は感謝の気持ちを伝えてもらえると嬉しい'
      },
      {
        icon: 'shopping',
        text: '買い物を手伝ってもらいたい'
      }
    ];
    sessionStorage.setItem('partner-list', JSON.stringify(storedItems));
  }

  const historyItems = JSON.parse(sessionStorage.getItem('history-list')) || [];

  if (historyItems.length === 0) {
    const storedItems = [
      { who: 'self', type: '登録', action: 'アプリの利用開始', date: '2024年9月10日 14:35' },
      { who: 'self', type: '登録', action: 'パートナーにグループURLを共有', date: '2024年9月11日 10:20' },
      { who: 'partner', type: '登録', action: 'リストアイテムを追加', date: '2024年9月29日 13:50' },
      { who: 'partner', type: '編集', action: 'リストアイテムを編集', date: '2024年9月30日 18:05' }
    ];

    const selfItems = JSON.parse(sessionStorage.getItem('self-list')).reverse();

    let d = 15;
    for (let item of selfItems) {
      storedItems.push({
        who: 'self',
        type: '登録',
        action: `自分がパートナーにしてほしいことリストに「${item.text}」を登録`,
        date: `2024年9月${d}日 0:00`
      });
      d += 1;
    }

    const partnerItems = JSON.parse(sessionStorage.getItem('partner-list')).reverse();

    d = 16;
    for (let item of partnerItems) {
      storedItems.push({
        who: 'partner',
        type: '登録',
        action: `パートナーが自分にしてほしいことリストに「${item.text}」を登録`,
        date: `2024年9月${d}日 0:00`
      });
      d += 1;
    }

    sessionStorage.setItem('history-list', JSON.stringify(storedItems));
  }
}
