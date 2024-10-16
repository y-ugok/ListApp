'use strict';

// ダイアログとボタンの参照を取得
const resetDialog = document.getElementById('reset-dialog');
const resetButton = document.getElementById('reset-btn');
const cancelResetButton = document.getElementById('cancel-reset');
const confirmResetButton = document.getElementById('confirm-reset');

// 初期化ボタンが押された時に確認ダイアログを表示
resetButton.addEventListener('click', () => {
  resetDialog.showModal();
});

// キャンセルボタンが押された時にダイアログを閉じる
cancelResetButton.addEventListener('click', () => {
  resetDialog.close();
});

// OKボタンが押された時にローカルストレージを初期化
confirmResetButton.addEventListener('click', () => {
  // ローカルストレージから全データを削除
  localStorage.clear();

  // ダイアログを閉じる
  resetDialog.close();

  // 初期化完了のメッセージを表示するか、ページをリロードして変更を反映
  alert('データを初期化しました');
  location.reload(); // ページをリロードして初期状態を反映
});
