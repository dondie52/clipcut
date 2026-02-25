/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree and displays a fallback UI.
 * Reports errors to Sentry for production monitoring.
 * @module components/ErrorBoundary
 */

import { Component } from 'react';
import { captureError, addBreadcrumb, logger } from '../utils';

/**
 * Error boundary wrapper component
 * Use this to wrap routes or sections that might throw errors
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      eventId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logger.error('ErrorBoundary caught an error', { error, errorInfo });
    captureError(error, { source: 'ErrorBoundary', componentStack: errorInfo?.componentStack });
    
    this.setState({ errorInfo });
    
    // Add breadcrumb for context
    addBreadcrumb({
      category: 'error_boundary',
      message: `Error caught: ${error.message}`,
      level: 'error',
    });
    
    // Report error to Sentry
    captureError(error, {
      tags: {
        type: 'error_boundary',
        boundary: this.props.name || 'root',
      },
      extra: {
        componentStack: errorInfo?.componentStack,
        url: window.location.href,
      },
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Optionally navigate to a safe route
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.iconWrapper}>
              <span 
                className="material-symbols-outlined" 
                style={styles.icon}
              >
                error_outline
              </span>
            </div>
            
            <h1 style={styles.title}>Something went wrong</h1>
            
            <p style={styles.message}>
              We're sorry, but something unexpected happened. 
              Please try refreshing the page or go back to the dashboard.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={styles.details}>
                <summary style={styles.summary}>Error Details</summary>
                <pre style={styles.errorText}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div style={styles.buttonGroup}>
              <button 
                onClick={this.handleReset}
                style={styles.primaryButton}
              >
                Try Again
              </button>
              <button 
                onClick={() => window.location.href = '/dashboard'}
                style={styles.secondaryButton}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a0a',
    fontFamily: "'Spline Sans', sans-serif",
    padding: '20px',
  },
  card: {
    background: 'linear-gradient(135deg, #1a2332 0%, #0e1820 100%)',
    borderRadius: '16px',
    padding: '48px',
    maxWidth: '480px',
    width: '100%',
    textAlign: 'center',
    border: '1px solid rgba(117,170,219,0.15)',
    boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
  },
  iconWrapper: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'rgba(239, 68, 68, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
  },
  icon: {
    fontSize: '36px',
    color: '#ef4444',
  },
  title: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 600,
    margin: '0 0 12px',
  },
  message: {
    color: '#94a3b8',
    fontSize: '14px',
    lineHeight: 1.6,
    margin: '0 0 24px',
  },
  details: {
    background: 'rgba(0,0,0,0.3)',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '24px',
    textAlign: 'left',
  },
  summary: {
    color: '#75aadb',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    marginBottom: '8px',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '11px',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    margin: 0,
    maxHeight: '200px',
    overflow: 'auto',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #75aadb 0%, #5a8cbf 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'Spline Sans', sans-serif",
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  },
  secondaryButton: {
    background: 'rgba(255,255,255,0.05)',
    color: '#94a3b8',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: "'Spline Sans', sans-serif",
    transition: 'background 0.15s ease',
  },
};

export default ErrorBoundary;
