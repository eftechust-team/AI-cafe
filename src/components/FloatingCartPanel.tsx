import React from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface FloatingCartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onViewFullCart: () => void;
}

const FloatingCartPanel: React.FC<FloatingCartPanelProps> = ({ isOpen, onClose, onViewFullCart }) => {
  const { cart, getTotalItems, removeFromCart, updateQuantity } = useCart();
  const { language } = useLanguage();
  const totalItems = getTotalItems();

  const styles: Record<string, React.CSSProperties> = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: isOpen ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
      zIndex: isOpen ? 999 : -1,
      opacity: isOpen ? 1 : 0,
      transition: 'opacity 0.3s ease',
      pointerEvents: isOpen ? 'auto' : 'none',
    },
    panel: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      width: '420px',
      maxHeight: '80vh',
      background: 'white',
      borderRadius: '16px 16px 0 0',
      boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1001,
      transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.3s ease',
      overflow: 'hidden',
    },
    header: {
      padding: '20px',
      borderBottom: '1px solid #e8ecf1',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#fafbfc',
    },
    headerTitle: {
      fontSize: '1.3rem',
      fontWeight: 700,
      color: '#1a2332',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#6b7f96',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'color 0.2s ease',
    },
    itemsList: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px',
    },
    emptyState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: '#6b7f96',
      textAlign: 'center' as any,
      gap: '12px',
    },
    emptyIcon: {
      fontSize: '48px',
      opacity: 0.5,
    },
    emptyText: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    cartItem: {
      padding: '12px',
      background: '#f9fafb',
      borderRadius: '8px',
      marginBottom: '12px',
      borderLeft: '4px solid #5b9bd5',
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      marginBottom: '8px',
    },
    itemName: {
      fontWeight: 600,
      color: '#1a2332',
      fontSize: '0.95rem',
      flex: 1,
    },
    removeButton: {
      background: 'none',
      border: 'none',
      color: '#ff6b6b',
      cursor: 'pointer',
      fontSize: '18px',
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      marginLeft: '8px',
    },
    itemDetails: {
      fontSize: '0.85rem',
      color: '#6b7f96',
      marginBottom: '8px',
    },
    quantityControl: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    quantityButton: {
      background: '#e8ecf1',
      border: 'none',
      width: '28px',
      height: '28px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 600,
      color: '#1a2332',
      transition: 'background 0.2s ease',
    },
    quantity: {
      minWidth: '20px',
      textAlign: 'center' as any,
      fontSize: '0.9rem',
      fontWeight: 500,
      color: '#1a2332',
    },
    footer: {
      padding: '16px',
      borderTop: '1px solid #e8ecf1',
      background: '#fafbfc',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    summary: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '1rem',
      fontWeight: 600,
      color: '#1a2332',
    },
    viewCartButton: {
      width: '100%',
      padding: '14px',
      background: 'linear-gradient(135deg, #5b9bd5, #4a90e2)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '1rem',
      transition: 'all 0.2s ease',
    },
  };

  return (
    <>
      <div style={styles.overlay} onClick={onClose} />
      <div style={styles.panel}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerTitle}>
            {language === 'en' ? 'Shopping Cart' : '購物車'}
          </div>
          <button
            style={styles.closeButton}
            onClick={onClose}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = '#1a2332';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = '#6b7f96';
            }}
          >
            ✕
          </button>
        </div>

        {/* Items List */}
        <div style={styles.itemsList}>
          {cart.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🛒</div>
              <div style={styles.emptyText}>
                {language === 'en' ? 'Your cart is empty' : '您的購物車是空的'}
              </div>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id!} style={styles.cartItem}>
                <div style={styles.itemHeader}>
                  <div style={styles.itemName}>{item.productName}</div>
                  <button
                    style={styles.removeButton}
                    onClick={() => removeFromCart(item.id!)}
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
                <div style={styles.itemDetails}>
                  {item.category === 'snack' && item.customizations?.shape && (
                    <div>
                      {language === 'en' ? 'Shape:' : '形狀:'} {item.customizations.shape}
                    </div>
                  )}
                  {item.customizations?.text && (
                    <div>
                      {language === 'en' ? 'Text:' : '文本:'} {item.customizations.text}
                    </div>
                  )}
                </div>
                <div style={styles.quantityControl}>
                  <button
                    style={styles.quantityButton}
                    onClick={() => updateQuantity(item.id!, item.quantity - 1)}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#d9e0e8';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#e8ecf1';
                    }}
                  >
                    −
                  </button>
                  <div style={styles.quantity}>{item.quantity}</div>
                  <button
                    style={styles.quantityButton}
                    onClick={() => updateQuantity(item.id!, item.quantity + 1)}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#d9e0e8';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#e8ecf1';
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.summary}>
              <span>{language === 'en' ? 'Total Items:' : '總件數:'}</span>
              <span>{totalItems}</span>
            </div>
            <button
              style={styles.viewCartButton}
              onClick={onViewFullCart}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 20px rgba(91, 155, 213, 0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
              }}
            >
              {language === 'en' ? 'View Full Cart' : '查看完整購物車'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingCartPanel;
