"use strict"

// formの送信による再読み込みでループさせる

// 変数の初期化
var ja_name; // 正解を保持しておく場所
var img_elem;


// メイン処理（ランダムなポケモンの画像を表示する関数）
async function display() {
    // 1-151のランダムな数字を選ぶ
    var random = Math.floor(Math.random() * 151) + 1

    // APIでjsonを取得する
    var res = await fetch("https://pokeapi.co/api/v2/pokemon/" + random);
    var data = await res.json();
    var img_src = data['sprites']['front_default'];

    // HTMLのimg要素を生成する
    img_elem = document.createElement('img');
    img_elem.src = img_src;

    // 画像を表示する
    var div = document.getElementById('image');
    div.appendChild(img_elem);

    // jsonファイルを読み込んで、日本語の名前を取得する
    $.getJSON("name_trans.json", function (data) {
        ja_name = data[random - 1].ja;
    });
}


// フォーム「答え合わせ」ボタンが押された時の処理
function checkAnswer() {
    // 入力された答えを保持
    var input_answer = document.getElementById('answer').value;
    // 正解判定する
    if (input_answer === ja_name) {
        setTimeout(maru, 1000);
    } else {
        setTimeout(batu, 1000);
    }
}


// 正解時の処理
function maru() {
    var judge_elem = document.getElementById('judge'); // 正誤表示する箇所を取得
    judge_elem.innerText = "せいかい";
    img_elem.style.filter = "brightness(100%)"; // 画像をカラーにする
    setTimeout(reset, 1000); // 1秒後にreset関数処理
    setTimeout(display, 2000); // その1秒後にdisplay関数処理
}

// 不正解時の処理
function batu() {
    var judge_elem = document.getElementById('judge'); // 正誤表示する箇所を取得
    judge_elem.innerText = "ざんねん";
    judge_elem.style.color = "blue";
    setTimeout(reset, 1000);
    setTimeout(display, 2000);
}


// リセット関数
function reset() {
    // 画像を消す（img要素を消去）
    var image = document.getElementById('image'); // 親要素を取得
    image.innerHTML = ""; // 親要素内のHTMLを空にする
    // 正誤判定の文字を消去する
    var judge_elem = document.getElementById('judge'); // 正誤表示する箇所を取得
    judge_elem.innerText = "";
    // 入力フォームを消去する
    var input_answer = document.getElementById('answer');
    input_answer.value = "";
    // 入力フォームにフォーカスをあてる
    input_answer.autofocus = true;
}

display();