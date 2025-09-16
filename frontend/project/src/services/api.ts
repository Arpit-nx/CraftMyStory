export async function addCard(card: any) {
  const token = localStorage.getItem("token");
  const res = await fetch("http://127.0.0.1:5000/marketplace/card", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(card),
  });
  return res.json();
}

export async function getMyCards() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://127.0.0.1:5000/marketplace/my-cards", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
