import React from 'react';
import { useCart } from '../context/CartContext';

interface FloatingCartButtonProps {
  onClick: () => void;
  isCartOpen: boolean;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ onClick, isCartOpen }) => {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  const styles: Record<string, React.CSSProperties> = {
    container: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease-out',
    },
    button: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: isCartOpen ? 'linear-gradient(135deg, #4a90e2, #357abd)' : 'linear-gradient(135deg, #5b9bd5, #4a90e2)',
      border: isCartOpen ? '3px solid #5b9bd5' : 'none',
      cursor: 'pointer',
      boxShadow: isCartOpen ? '0 12px 32px rgba(91, 155, 213, 0.45)' : '0 8px 24px rgba(91, 155, 213, 0.35)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      fontSize: '24px',
    },
    badge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      background: '#ff6b6b',
      color: 'white',
      borderRadius: '50%',
      width: '28px',
      height: '28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 700,
      boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
    },
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
      <button
        style={styles.button}
        onClick={onClick}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = isCartOpen 
            ? '0 16px 40px rgba(91, 155, 213, 0.55)' 
            : '0 12px 32px rgba(91, 155, 213, 0.45)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = isCartOpen
            ? '0 12px 32px rgba(91, 155, 213, 0.45)'
            : '0 8px 24px rgba(91, 155, 213, 0.35)';
        }}
        title="Shopping Cart"
      >
        🛒
        {cartCount > 0 && <div style={styles.badge}>{cartCount}</div>}
      </button>
    </div>
  );
};

export default FloatingCartButton;
