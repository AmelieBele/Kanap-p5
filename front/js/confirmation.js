const htmlOrderId = document.getElementById("orderId");
const appelOrderId = window.location.search;
const url = new URLSearchParams(appelOrderId);
const orderId = url.get("orderId");
htmlOrderId.textContent = orderId;
