import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  addItem: (newItem) => set((state) => {
    const existingItem = state.items.find((item) => item.id === newItem.id);
    if (existingItem) {
      return {
        items: state.items.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
        isOpen: true, // פותח את העגלה אוטומטית כשהוסף מוצר
      };
    }
    return { items: [...state.items, { ...newItem, quantity: 1 }], isOpen: true };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),
  totalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
}));