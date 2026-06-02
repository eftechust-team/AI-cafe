import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

interface ShoppingCartScreenProps {
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const ShoppingCartScreen: React.FC<ShoppingCartScreenProps> = ({ onContinueShopping, onCheckout }) => {
  const { language } = useLanguage();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const categoryEmojis = {
    tea: '🍵',
    coffee: '☕',
    snack: '🍪',
  };

  const styles: Record<string, React.CSSProperties> = {
    container: {
      width: '100%',
      minHeight: '100vh',
      background: '#fafbfc',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '30px',
      maxWidth: '1000px',
      margin: '0 auto 30px',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#1a2332',
      margin: 0,
    },
    backButton: {
      background: 'white',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#e8ecf1',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 500,
      color: '#7a8fa6',
      transition: 'all 0.2s',
    },
    content: {
      maxWidth: '1000px',
      margin: '0 auto',
    },
    emptyCart: {
      textAlign: 'center' as any,
      padding: '60px 20px',
    },
    emptyIcon: {
      fontSize: '4rem',
      marginBottom: '20px',
    },
    emptyText: {
      fontSize: '1.1rem',
      color: '#7a8fa6',
      marginBottom: '30px',
    },
    cartList: {
      display: 'flex',
      flexDirection: 'column' as any,
      gap: '15px',
      marginBottom: '30px',
    },
    cartItem: {
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#e8ecf1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
    },
    itemInfo: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    itemEmoji: {
      fontSize: '2rem',
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#1a2332',
      marginBottom: '5px',
    },
    itemCategory: {
      fontSize: '0.85rem',
      color: '#7a8fa6',
      marginBottom: '8px',
    },
    itemCustomizations: {
      fontSize: '0.8rem',
      color: '#7a8fa6',
      fontStyle: 'italic',
      marginBottom: '5px',
    },
    itemControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    quantityControl: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: '#f5f7fa',
      borderRadius: '6px',
      padding: '5px 10px',
    },
    quantityButton: {
      background: 'transparent',
      border: 'none',
      color: '#5b9bd5',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 600,
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
    },
    quantity: {
      color: '#2c3e50',
      fontWeight: 600,
      minWidth: '30px',
      textAlign: 'center' as any,
    },
    deleteButton: {
      background: '#fff5f5',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#f5d4d4',
      color: '#c53030',
      padding: '8px 12px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontWeight: 500,
      transition: 'all 0.2s',
    },
    summary: {
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#e8ecf1',
      marginBottom: '20px',
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: '10px',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: '#e8ecf1',
      marginBottom: '10px',
    },
    summaryLabel: {
      fontSize: '0.95rem',
      color: '#7a8fa6',
    },
    summaryValue: {
      fontSize: '0.95rem',
      fontWeight: 600,
      color: '#2c3e50',
    },
    summaryTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '10px',
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#1a2332',
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
    },
    button: {
      padding: '12px 30px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #5b9bd5, #4a90e2)',
      color: 'white',
      minWidth: '200px',
    },
    secondaryButton: {
      background: 'white',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#e8ecf1',
      color: '#7a8fa6',
      minWidth: '200px',
    },
  };

  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            {language === 'en' ? '🛒 Shopping Cart' : '🛒 購物車'}
          </h1>
          <button style={styles.backButton} onClick={onContinueShopping}>
            {language === 'en' ? '← Back' : '← 返回'}
          </button>
        </div>
        <div style={styles.emptyCart}>
          <div style={styles.emptyIcon}>📭</div>
          <p style={styles.emptyText}>
            {language === 'en' ? 'Your cart is empty' : '您的購物車是空的'}
          </p>
          <button style={{ ...styles.button, ...styles.primaryButton }} onClick={onContinueShopping}>
            {language === 'en' ? 'Start Shopping' : '開始購物'}
          </button>
        </div>
      </div>
    );
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          {language === 'en' ? '🛒 Shopping Cart' : '🛒 購物車'}
        </h1>
        <button style={styles.backButton} onClick={onContinueShopping}>
          {language === 'en' ? '← Continue Shopping' : '← 繼續購物'}
        </button>
      </div>

      <div style={styles.content}>
        <div style={styles.cartList}>
          {cart.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <div style={styles.itemInfo}>
                <div style={styles.itemEmoji}>
                  {categoryEmojis[item.category as keyof typeof categoryEmojis]}
                </div>
                <div style={styles.itemDetails}>
                  <div style={styles.itemName}>{item.productName}</div>
                  <div style={styles.itemCategory}>
                    {language === 'en'
                      ? item.category.charAt(0).toUpperCase() + item.category.slice(1)
                      : item.category === 'tea'
                      ? '茶'
                      : item.category === 'coffee'
                      ? '咖啡'
                      : '點心'}
                  </div>
                  {item.customizations?.text && (
                    <div style={styles.itemCustomizations}>
                      {language === 'en' ? 'Custom text: ' : '自訂文字：'} "{item.customizations.text}"
                    </div>
                  )}
                  {item.customizations?.shape && (
                    <div style={styles.itemCustomizations}>
                      {language === 'en' ? 'Shape: ' : '形狀：'} {item.customizations.shape}
                    </div>
                  )}
                </div>
              </div>

              <div style={styles.itemControls}>
                <div style={styles.quantityControl}>
                  <button
                    style={styles.quantityButton}
                    onClick={() => updateQuantity(item.id!, item.quantity - 1)}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.transform = 'scale(1.2)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.transform = 'scale(1)';
                    }}
                  >
                    −
                  </button>
                  <div style={styles.quantity}>{item.quantity}</div>
                  <button
                    style={styles.quantityButton}
                    onClick={() => updateQuantity(item.id!, item.quantity + 1)}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.transform = 'scale(1.2)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.transform = 'scale(1)';
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  style={styles.deleteButton}
                  onClick={() => removeFromCart(item.id!)}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.background = '#fde2e2';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.background = '#fff5f5';
                  }}
                >
                  {language === 'en' ? 'Remove' : '移除'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.summary}>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>
              {language === 'en' ? 'Items:' : '商品數量：'}
            </span>
            <span style={styles.summaryValue}>{totalItems}</span>
          </div>
          <div style={styles.summaryTotal}>
            <span>{language === 'en' ? 'Total Items' : '總計'}</span>
            <span>{totalItems}</span>
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={onContinueShopping}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = '#5b9bd5';
              (e.target as HTMLElement).style.color = '#5b9bd5';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = '#e8ecf1';
              (e.target as HTMLElement).style.color = '#7a8fa6';
            }}
          >
            {language === 'en' ? '← Continue Shopping' : '← 繼續購物'}
          </button>
          <button
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={onCheckout}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLElement).style.boxShadow = '0 8px 16px rgba(75, 144, 226, 0.3)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(0)';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            {language === 'en' ? 'Proceed to Checkout ✓' : '結帳 ✓'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartScreen;
