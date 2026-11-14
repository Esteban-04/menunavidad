import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { DishModal } from './components/DishModal';
import { EventsSection } from './components/EventsSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MenuCatalog } from './components/MenuCatalog';
import { OrderDrawer } from './components/OrderDrawer';
import { WhatsAppLauncher } from './components/WhatsAppLauncher';
import { getCartItemUnitTotal } from './data/menuData';
import { CartItem, DeliveryInfo, MenuItem } from './types/menu';

const CART_STORAGE_KEY = 'menu_navideno_2026_cart';
const DELIVERY_INFO_STORAGE_KEY = 'menu_navideno_2026_delivery_info';

const DEFAULT_DELIVERY_INFO: DeliveryInfo = {
  customerName: '',
  phone: '',
  address: '',
  neighborhood: '',
  deliveryTiming: 'asap',
  scheduledDateTime: '',
  paymentPreference: 'nequi',
};

export default function App() {
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>(() => {
    if (typeof window === 'undefined') return DEFAULT_DELIVERY_INFO;
    try {
      const raw = window.localStorage.getItem(DELIVERY_INFO_STORAGE_KEY);
      if (!raw) return DEFAULT_DELIVERY_INFO;
      const parsed = JSON.parse(raw) as Partial<DeliveryInfo>;
      const validPayment =
        parsed.paymentPreference === 'nequi' ||
        parsed.paymentPreference === 'daviplata' ||
        parsed.paymentPreference === 'cash'
          ? parsed.paymentPreference
          : 'nequi';
      return { ...DEFAULT_DELIVERY_INFO, ...parsed, paymentPreference: validPayment };
    } catch {
      return DEFAULT_DELIVERY_INFO;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [activeDish, setActiveDish] = useState<MenuItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        DELIVERY_INFO_STORAGE_KEY,
        JSON.stringify(deliveryInfo)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [deliveryInfo]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + getCartItemUnitTotal(item) * item.quantity,
    0
  );

  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.menuItemId === newItem.menuItemId &&
          item.notes === newItem.notes &&
          JSON.stringify(item.selectedOptions) ===
            JSON.stringify(newItem.selectedOptions)
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity,
        };
        return updated;
      }
      return [...prev, newItem];
    });
    setToastMessage(`${newItem.quantity}x ${newItem.name} agregado al pedido`);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1916]">
      <Header
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        onOpenOrderDrawer={() => setIsDrawerOpen(true)}
      />

      <main className="flex-1">
        <HeroSection />

        <MenuCatalog onSelectDish={(dish) => setActiveDish(dish)} />

        <EventsSection />
      </main>

      <Footer />

      <DishModal
        dish={activeDish}
        onClose={() => setActiveDish(null)}
        onAddToCart={handleAddToCart}
      />

      <OrderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        deliveryInfo={deliveryInfo}
        onDeliveryInfoChange={setDeliveryInfo}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
      />

      <WhatsAppLauncher
        isOpen={isWhatsAppOpen}
        onToggle={() => setIsWhatsAppOpen((prev) => !prev)}
        deliveryInfo={deliveryInfo}
        cart={cart}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-4 z-40 max-w-sm bg-[#1E1916] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3"
        >
          <CheckCircle2
            className="w-5 h-5 text-[#E8B84B] shrink-0"
            aria-hidden="true"
          />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setIsDrawerOpen(true);
            }}
            className="ml-auto text-xs font-semibold underline underline-offset-2 text-[#E8B84B] hover:text-white cursor-pointer whitespace-nowrap shrink-0"
          >
            Ver Pedido
          </button>
        </div>
      )}
    </div>
  );
}
