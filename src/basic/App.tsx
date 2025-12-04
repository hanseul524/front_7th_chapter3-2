import { useState, useMemo } from 'react';
import { AdminPage } from './pages/admin/AdminPage';
import { CartPage } from './pages/cart/CartPage';
import { Header } from './components/Header';
import { NotificationContainer } from './components/Notification';
import { useNotification } from './utils/hooks/useNotification';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { useCoupons } from './hooks/useCoupons';

const App = () => {
  const { notifications, addNotification, removeNotification } = useNotification();
  const productsHook = useProducts(addNotification);
  const cartHook = useCart(addNotification);
  const couponsHook = useCoupons(addNotification);

  // UI 상태
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 장바구니 총 아이템 수 계산
  const totalItemCount = useMemo(() => {
    return cartHook.cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartHook.cart]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NotificationContainer
        notifications={notifications}
        onRemove={removeNotification}
      />

      <Header 
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartItemCount={totalItemCount}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {isAdmin ? (
          <AdminPage
            productsHook={productsHook}
            couponsHook={couponsHook}
          />
        ) : (
          <CartPage
            productsHook={productsHook}
            cartHook={cartHook}
            couponsHook={couponsHook}
            searchTerm={searchTerm}
          />
        )}
      </main>
    </div>
  );
};

export default App;
