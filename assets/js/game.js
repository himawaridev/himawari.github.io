var balance = 0;
var betAmount = 0;
var isPlaying = false;

function updateBalance() {
  var balanceElement = document.getElementById("balance");
  balanceElement.innerHTML = "Số dư: " + balance;
}

document
  .getElementById("deposit-button")
  .addEventListener("click", function () {
    var depositAmount = parseInt(prompt("Nhập số tiền muốn nạp từ thẻ ATM:"));
    if (isNaN(depositAmount) || depositAmount <= 0) {
      alert("Số tiền không hợp lệ!");
    } else {
      simulateDepositFromATM(depositAmount);
    }
  });

document
  .getElementById("place-bet-button")
  .addEventListener("click", function () {
    if (isPlaying) {
      alert("Bạn đang trong quá trình chơi, vui lòng chờ kết quả.");
      return;
    }

    betAmount = parseInt(document.getElementById("bet-amount").value);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
      alert("Số tiền cược không hợp lệ!");
    } else {
      isPlaying = true;
      document.getElementById("tai-button").disabled = false;
      document.getElementById("xiu-button").disabled = false;
      alert("Đặt cược thành công!");
    }
  });

document.getElementById("tai-button").addEventListener("click", function () {
  if (isPlaying) {
    playGame("tai");
  } else {
    alert("Vui lòng đặt cược trước khi chơi.");
  }
});

document.getElementById("xiu-button").addEventListener("click", function () {
  if (isPlaying) {
    playGame("xiu");
  } else {
    alert("Vui lòng đặt cược trước khi chơi.");
  }
});

function simulateDepositFromATM(amount) {
  setTimeout(function () {
    balance += amount;
    updateBalance();
    document.getElementById("tai-button").disabled = true;
    document.getElementById("xiu-button").disabled = true;
    alert("Nạp tiền thành công từ thẻ ATM!");
  }, 2000);
}

function playGame(selection) {
  if (balance < betAmount) {
    alert("Bạn không đủ tiền để chơi!");
    return;
  }

  isPlaying = false;
  var dice1 = Math.floor(Math.random() * 6) + 1;
  var dice2 = Math.floor(Math.random() * 6) + 1;
  var dice3 = Math.floor(Math.random() * 6) + 1;

  document.getElementById("dice1").innerHTML = dice1;
  document.getElementById("dice2").innerHTML = dice2;
  document.getElementById("dice3").innerHTML = dice3;

  var resultElement = document.getElementById("result");

  var resultHTML = "";

  var isWin = false;
  var total = dice1 + dice2 + dice3;

  resultHTML += "Kết quả:       " + dice1 + "   " + dice2 + "   " + dice3 + " = " + total + "<br>";

  if (selection === "tai") {
    if (total > 9) {
      isWin = true;
      balance += betAmount;
      resultHTML += "Tài";
    } else {
      balance -= betAmount;
      resultHTML += "Xỉu";
    }
  } else if (selection === "xiu") {
    if (total < 10) {
      isWin = true;
      balance += betAmount;
      resultHTML += "Xỉu";
    } else {
      balance -= betAmount;
      resultHTML += "Tài";
    }
  }
  if (balance <= 0) {
    document.getElementById("tai-button").disabled = true;
    document.getElementById("xiu-button").disabled = true;
    resultHTML +=
      "<br>Bạn đã hết tiền! Vui lòng nạp thêm tiền để tiếp tục chơi.";
  }

  resultElement.innerHTML = resultHTML;
  updateBalance();
}

updateBalance();

// document.getElementById("deposit-button").addEventListener("click", function() {
//     window.location.href = "menu.html";
//   });
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    return null;
  }
  
  window.addEventListener("DOMContentLoaded", function() {
    var selectedAmount = getQueryVariable("amount");
    if (selectedAmount) {
      document.getElementById("balance").textContent = selectedAmount;
    }
  });
  