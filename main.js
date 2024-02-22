$(function () {
  let untyped = "";
  let typed = "";
  let score = 0;
  let scoreText = $("#score");
  const untypedfield = $("#untyped");
  const typedfield = $("#typed");

  // 複数のテキストを格納する
  const textLists = [
    "Hello World",
    "This is my App",
    "How are you?",
    "Today is sunny",
    "I love JavaScript!",
    "Good morning",
    "I am Japanese",
    "Let it be",
    "Samurai",
    "Typing Game",
    "Information Technology",
    "I want to be a programmer",
    "What day is today?",
    "I want to build a web app",
    "Nice to meet you",
    "Chrome Firefox Edge Safari",
    "machine learning",
    "Brendan Eich",
    "John Resig",
    "React Vue Angular",
    "Netscape Communications",
    "undefined null NaN",
    "Thank you very much",
    "Google Apple Facebook Amazon",
    "ECMAScript",
    "console.log",
    "for while if switch",
    "var let const",
    "Windows Mac Linux iOS Android",
    "programming",
  ];

  // ランダムなテキストを表示
  function createText() {
    typed = "";
    typedfield.text(typed);
    let random = Math.floor(Math.random() * textLists.length);
    untyped = textLists[random];
    untypedfield.text(untyped);
  }

  // キー入力の判定
  function keypress(e) {
    // 誤タイプの場合
    if (e.key !== untyped.substring(0, 1)) {
      $("#wrap").addClass("mistyped");

      setTimeout(() => {
        $("#wrap").removeClass("mistyped");
      }, 100);

      return;
    }

    // 正タイプの場合
    score++;
    typed += untyped.substring(0, 1);
    untyped = untyped.substring(1);
    typedfield.text(typed);
    showScore(score);
    untypedfield.text(untyped);

    if (untyped === "") {
      createText();
    }
  }

  function showScore(score) {
    scoreText.text(score);
  }

  // タイピングスキルのランクを判定
  function rankCheck(score) {
    let text = "";

    if (score < 100) {
      text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if (score < 200) {
      text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
    } else if (score < 300) {
      text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
    } else if (score >= 300) {
      text = `あなたのランクはSです。\nおめでとうございます!`;
    }

    // 生成したメッセージと一緒に文字列を返す
    return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`;
  }

  // ゲームを終了させる
  function gameOver(id) {
    clearInterval(id);
    untypedfield.text("タイムアップ！");
    typed = "";
    typedfield.text(typed);

    setTimeout(() => {
      const result = confirm(rankCheck(score));
      if (result == true) {
        location.reload();
      }
    }, 10);
  }

  // カウントダウンタイマー
  function timer() {
    let count = $("#count").text();

    const id = setInterval(() => {
      count--;
      $("#count").text(count);

      if (count <= 0) {
        gameOver(id);
      }
    }, 1000);
  }

  // ゲームスタート時の処理
  $("#start").on("click", function () {
    timer();
    createText();
    scoreText.show();

    $("#start").hide();

    // キーボードのイベント処理
    $(document).on("keypress", keypress);
  });

  untypedfield.text("スタートボタンで開始");
  scoreText.hide();
});
