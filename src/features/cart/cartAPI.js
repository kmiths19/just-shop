export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/", {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify(item) 
    });
    const data = await response.json();
    resolve({ data });
  }
  );
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user=" +userId);
    const data = await response.json();
    resolve({ data });
  }
  );
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: 'PATCH',
      headers: {'content-type':'application/json'},
      body: JSON.stringify(update) 
    });
    const data = await response.json(); 
    resolve({ data });
  }
  );
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: 'DELETE',
      headers: {'content-type':'application/json'},
    });
    const data = await response.json(); 
    resolve({ data: {id:itemId} });
  }
  );
}