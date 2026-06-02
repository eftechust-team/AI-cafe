import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

interface RecommendationScreenProps {
  category: 'tea' | 'coffee' | 'snack';
  recommendation: any;
  onOrderClick: () => void;
  onNewRecommendation: () => void;
  onViewCart: () => void;
  onHome: () => void;
  onDesignTop?: () => void;
}

const RecommendationScreen: React.FC<RecommendationScreenProps> = ({
  category,
  recommendation,
  onOrderClick,
  onNewRecommendation,
  onViewCart,
  onHome,
  onDesignTop
}) => {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: Date.now().toString(),
      category,
      productName: recommendation.name,
      quantity: 1,
      customizations: {
        text: 'Customizable'
      }
    });
    onViewCart();
  };

  const styles: Record<string, React.CSSProperties> = {
    container: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fafbfc',
      padding: '40px 20px',
      overflow: 'auto',
      position: 'relative'
    },
    header: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      display: 'flex',
      alignItems: 'center'
    },
    newButton: {
      background: 'none',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      color: '#7a8fa6',
      fontWeight: 500,
      padding: '10px 20px'
    },
    title: {
      fontSize: '2rem',
      color: '#1a2332',
      textAlign: 'center' as any,
      marginBottom: '40px',
      marginTop: '80px'
    },
    content: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      maxWidth: '800px'
    },
    card: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 8px 32px rgba(26, 35, 50, 0.08)',
      width: '100%'
    },
    imagePlaceholder: {
      width: '100%',
      height: '200px',
      background: '#f5f7fa',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '30px'
    },
    imageIcon: {
      fontSize: '4rem'
    },
    details: {
      marginBottom: '30px'
    },
    name: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#1a2332',
      marginBottom: '10px'
    },
    description: {
      fontSize: '1rem',
      color: '#7a8fa6',
      lineHeight: 1.6,
      marginBottom: '20px'
    },
    spec: {
      fontSize: '0.95rem',
      color: '#7a8fa6',
      lineHeight: 1.8,
      marginBottom: '15px'
    },
    specLabel: {
      fontWeight: 600,
      color: '#1a2332'
    },
    buttons: {
      display: 'flex',
      gap: '15px',
      marginTop: '30px',
      justifyContent: category === 'snack' ? 'space-between' : 'space-between',
      flexWrap: 'wrap' as any
    },
    designTopButton: {
      background: 'linear-gradient(135deg, #5b9bd5, #4a90e2)',
      color: 'white',
      border: 'none',
      padding: '15px 40px',
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      flex: category === 'snack' ? '1' : 'unset'
    },
    addToCartButton: {
      background: 'linear-gradient(135deg, #5b9bd5, #4a90e2)',
      color: 'white',
      border: 'none',
      padding: '15px 40px',
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      flex: category === 'snack' ? '1' : 'unset'
    },
    cancelButton: {
      background: 'white',
      border: '2px solid #e8ecf1',
      color: '#7a8fa6',
      padding: '13px 30px',
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      flex: category === 'snack' ? '1' : 'unset'
    },
    orderButton: {
      background: 'linear-gradient(135deg, #5b9bd5, #4a90e2)',
      color: 'white',
      border: 'none',
      padding: '15px 40px',
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'transform 0.2s'
    },
    cartButton: {
      background: 'white',
      border: '2px solid #e8ecf1',
      color: '#5b9bd5',
      padding: '13px 30px',
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.newButton} onClick={onNewRecommendation}>
          {t.common.back}
        </button>
      </div>

      <h1 style={styles.title}>
        {category === 'tea' && '🍵 ' + t.recommendation.title}
        {category === 'coffee' && '☕ ' + t.recommendation.title}
        {category === 'snack' && '🍪 ' + t.recommendation.title}
      </h1>

      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.imagePlaceholder}>
            <div style={styles.imageIcon}>
              {category === 'tea' && '🍵'}
              {category === 'coffee' && '☕'}
              {category === 'snack' && '🍪'}
            </div>
          </div>

          <div style={styles.details}>
            <h2 style={styles.name}>{recommendation.name}</h2>
            <p style={styles.description}>{recommendation.description || recommendation.function}</p>
            
            <div style={styles.spec}>
              <span style={styles.specLabel}>{t.recommendation.category}: </span>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          </div>

          <div style={styles.buttons}>
            {category === 'snack' ? (
              <>
                <button
                  style={styles.designTopButton}
                  onClick={onDesignTop}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.target as HTMLElement).style.boxShadow = '0 8px 20px rgba(91, 155, 213, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.transform = 'translateY(0)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  ✏️ Design Top
                </button>
                <button
                  style={styles.addToCartButton}
                  onClick={handleAddToCart}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.target as HTMLElement).style.boxShadow = '0 8px 20px rgba(91, 155, 213, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.transform = 'translateY(0)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  🛒 {t.common.addToCart || 'Add to Cart'}
                </button>
                <button
                  style={styles.cancelButton}
                  onClick={onHome}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.background = '#f5f7fa';
                    (e.target as HTMLElement).style.borderColor = '#7a8fa6';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.background = 'white';
                    (e.target as HTMLElement).style.borderColor = '#e8ecf1';
                  }}
                >
                  ✕ {t.common.cancel || 'Cancel'}
                </button>
              </>
            ) : (
              <>
                <button
                  style={styles.addToCartButton}
                  onClick={handleAddToCart}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.target as HTMLElement).style.boxShadow = '0 8px 20px rgba(91, 155, 213, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.transform = 'translateY(0)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  🛒 {t.common.addToCart || 'Add to Cart'}
                </button>
                <button
                  style={styles.cancelButton}
                  onClick={onHome}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.background = '#f5f7fa';
                    (e.target as HTMLElement).style.borderColor = '#7a8fa6';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.background = 'white';
                    (e.target as HTMLElement).style.borderColor = '#e8ecf1';
                  }}
                >
                  ✕ {t.common.cancel || 'Cancel'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationScreen;
