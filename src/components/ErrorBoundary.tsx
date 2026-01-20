import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>

            <h1 className="text-4xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Cormorant Garamond' }}>
              Něco se pokazilo
            </h1>

            <p className="text-gray-600 text-lg mb-8">
              Omlouváme se, ale došlo k neočekávané chybě. Zkuste prosím obnovit stránku nebo se vraťte na domovskou stránku.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-gray-100 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold text-red-600 mb-2">Error Details (dev mode):</h3>
                <pre className="text-xs text-gray-700 overflow-auto max-h-48">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReload}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-medium transition-colors shadow-lg"
              >
                <RefreshCw className="w-5 h-5" />
                Obnovit stránku
              </button>

              <button
                onClick={this.handleGoHome}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium transition-colors"
              >
                <Home className="w-5 h-5" />
                Domů
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Pokud problém přetrvává, kontaktujte nás na:{' '}
                <a href="tel:+420774672458" className="text-primary hover:underline font-medium whitespace-nowrap">
                  +420 774 672 458
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
