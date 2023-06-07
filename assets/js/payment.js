document.getElementById("payment-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Ngăn chặn việc gửi form mặc định
  
    // Xử lý thanh toán ở đây
    var cardNumber = document.getElementById("card-number").value;
    var expirationDate = document.getElementById("expiration-date").value;
    var cvv = document.getElementById("cvv").value;
  
    // Kiểm tra thông tin thanh toán và xác nhận thành công
    if (cardNumber && expirationDate && cvv) {
      alert("Thanh toán thành công!");
  
      // Chuyển hướng trở lại trang chơi game với số tiền đã chọn
      var selectedAmount = document.getElementById("selected-amount").value;
      window.location.href = "website.html" + selectedAmount;
    } else {
      alert("Thông tin thanh toán không hợp lệ. Vui lòng kiểm tra lại!");
    }
  });
  