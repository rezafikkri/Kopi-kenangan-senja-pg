document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Espresso', img: '1.jpg', price: 20000 },
      { id: 2, name: 'Latte', img: '2.jpg', price: 40000 },
      { id: 3, name: 'Cappuccino', img: '3.jpg', price: 25000 },
      { id: 4, name: 'Macchiato', img: '4.jpg', price: 35000 },
      { id: 5, name: 'Cold Brew', img: '5.jpg', price: 30000 },
    ]
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,

    add(newItem) {
      this.items.push(newItem);
      this.quantity++;
      this.total += newItem.price;
      console.log(this.total);
    }
  });
});

const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};
