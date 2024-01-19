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
      const cartItem = this.items.find(p => p.id === newItem.id);
      if (!cartItem) {
        this.items.push({...newItem, quantity: 1, total: newItem.price});
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map(p => {
          if (p.id !== newItem.id) {
            return p;
          } else {
            p.quantity++;
            p.total = p.price * p.quantity;
            this.quantity++;
            this.total += p.price;
            return p;
          }
        });
      }
    },

    remove(id) {
      const cartItem = this.items.find(p => p.id === id);
      if (cartItem.quantity > 1) {
        this.items = this.items.map(p => {
          if (p.id !== id) {
            return p;
          } else {
            p.quantity--;
            p.total = p.price * p.quantity;
            this.quantity--;
            this.total -= p.price;
            return p;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter(p => p.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
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
