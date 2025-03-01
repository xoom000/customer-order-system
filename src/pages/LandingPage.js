import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

// The breathing 33 logo component
const BreathingThirtyThree = () => (
  <div style={{ position: 'relative' }}>
    <style>{`
      @keyframes breathe {
        0% {
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.4),
                       0 0 40px rgba(59, 130, 246, 0.2);
        }
        50% {
          text-shadow: 0 0 40px rgba(59, 130, 246, 0.8),
                       0 0 80px rgba(59, 130, 246, 0.4),
                       0 0 100px rgba(59, 130, 246, 0.2);
        }
        100% {
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.4),
                       0 0 40px rgba(59, 130, 246, 0.2);
        }
      }
    `}</style>
    <div style={{
      fontSize: '6rem',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      fontWeight: '900',
      color: '#60A5FA',
      letterSpacing: '-3px',
      lineHeight: 1,
      animation: 'breathe 3s ease-in-out infinite',
      WebkitBackgroundClip: 'text',
      textAlign: 'center'
    }}>
      33
    </div>
  </div>
);

// Admin Modal Component
const AdminModal = ({ onClose, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(password);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#2B2B2B',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        padding: '1rem',
        backgroundColor: '#1F1F1F'
      }}>
        <button onClick={onClose} style={{ padding: '0.5rem' }}>
          <X color="white" size={24} />
        </button>
      </div>
      <div style={{ padding: '1rem' }}>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#1F1F1F',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1rem'
            }}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  const [customerNumber, setCustomerNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check for admin number
      if (customerNumber === '171936') {
        setShowAdminModal(true);
        return;
      }

      // Here you would check if it's a valid customer number
      const isValidCustomer = false; // This would be your actual check

      if (isValidCustomer) {
        window.location.href = `/customer/${customerNumber}`;
      } else {
        window.location.href = '/game';
      }

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      background: '#2B2B2B',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <BreathingThirtyThree />

        <h1 style={{
          color: 'white',
          fontSize: '2rem',
          fontWeight: '600',
          textAlign: 'center',
          margin: 0
        }}>
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} style={{
          width: '100%',
          textAlign: 'center'
        }}>
          <input
            type="text"
            value={customerNumber}
            onChange={(e) => setCustomerNumber(e.target.value)}
            placeholder="Customer #"
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#1F1F1F',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1.25rem',
              textAlign: 'center',
              marginBottom: '1rem'
            }}
          />

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '1rem',
              background: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? (
              <span>Accessing...</span>
            ) : (
              <>
                Continue
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <p style={{
          color: '#9CA3AF',
          textAlign: 'center',
          margin: 0
        }}>
          Need help finding your customer number?<br />
          Contact your account representative
        </p>
      </div>

      {showAdminModal && (
        <AdminModal 
          onClose={() => setShowAdminModal(false)}
          onSubmit={(password) => {
            if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
              window.location.href = '/admin';
            } else {
              throw new Error('Invalid password');
            }
          }}
        />
      )}
    </div>
  );
};

export default LandingPage;