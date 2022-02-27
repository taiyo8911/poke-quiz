"use strict"

// 変数の定義
var ja_name; // 正解を保持する
var judge_elem = document.getElementById('judge'); // 正誤表示箇所を取得
var img_elem;

// 画像の表示関数
async function display() {
    // 1-151のランダムな数字を選ぶ
    var random = Math.floor(Math.random() * (151 - 1 + 1)) + 1

    // APIでjsonを取得する
    var res = await fetch("https://pokeapi.co/api/v2/pokemon/" + random);
    var data = await res.json();
    var img_src = data['sprites']['front_default'];

    // img要素を生成する
    img_elem = document.createElement('img');
    img_elem.src = img_src;

    // 画像描画位置を取得
    var div = document.getElementById('image_parent');
    div.appendChild(img_elem);

    // jsonファイルを読み込んで、日本語の名前を取得する
    $.getJSON("name_trans.json", function (data) {
        ja_name = data[random - 1].ja;
    });
}


// 正解時の処理
function maru() {
    img_elem.style.filter = "brightness(100%)"; // 画像をカラー表示にする
    judge_elem.innerText = "正解";
    setTimeout(reset, 1000);
    setTimeout(display, 2000);
}

function batu() {
    judge_elem.innerText = "不正解";
    setTimeout(reset, 1000);
    setTimeout(display, 2000);

}

// 「答え合わせ」が押された時の処理（ここからメインループ開始）
function checkAnswer() {
    // 入力された答えを保持
    var input_elem = document.getElementById('text').value;
    // 正解判定する
    if (input_elem === ja_name) {
        setTimeout(maru, 1000);
    } else {
        setTimeout(batu, 1000);
    }
}

// リセット関数
function reset() {
    // 画像を消すために親要素を取得
    const parent = document.getElementById('image_parent');
    parent.innerHTML = "";
    //  正解判定の文字列を消去
    judge_elem.innerText = "";
    // 入力フォームを消去するために要素を取得
    var input_elem = document.getElementById('text');
    input_elem.value = "";
    // 入力フォームにフォーカスをあてる
    input_elem.autofocus = true;
}

display();