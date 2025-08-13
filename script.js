const board = document.getElementById("game-board");
const timerDisplay = document.getElementById("timer");

const emojis = ["🍎", "🍌", "🍓", "🍇", "🍉", "🍒", "🍍", "🥝"];
const emojiPairs = [...emojis, ...emojis]; // 8 أزواج = 16 بطاقة
let shuffled = emojiPairs.sort(() => 0.5 - Math.random());

let flippedCards = [];
let lockBoard = false;
let minute = 4;
let timeLeft = 60; // ⏳ الوقت بالثواني
let timerStarted = false;
let timerInterval;

function startTimer() {
  if (!timerStarted) {
    timerStarted = true;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.innerText = timeLeft;

      if (timeLeft === 0) {
        clearInterval(timerInterval);
        alert("❌ انتهى الوقت! حاول مرة أخرى.");
        window.location.reload(); // تعيد تحميل اللعبة
      }
    }, 1000);
  }
}

// 🧠 إنشاء الكروت
shuffled.forEach((emoji) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji = emoji;
  card.innerText = "❓";

  card.addEventListener("click", () => {
    if (lockBoard || card.classList.contains("flipped")) return;

    startTimer();

    card.innerText = emoji;
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      lockBoard = true;

      const [first, second] = flippedCards;
      if (first.dataset.emoji === second.dataset.emoji) {
        flippedCards = [];
        lockBoard = false;

        // ✔️ فحص نهاية اللعبة
        const allFlipped = document.querySelectorAll(".card.flipped").length;
        if (allFlipped === emojiPairs.length) {
          clearInterval(timerInterval);
          setTimeout(() => {
            alert( {seconds} );
          }, 60);
        }

      } else {
        setTimeout(() => {
          first.innerText = "❓";
          second.innerText = "❓";
          first.classList.remove("flipped");
          second.classList.remove("flipped");
          flippedCards = [];
          lockBoard = false;
        }, 1000);
      }
    }
  });

  board.appendChild(card);
});