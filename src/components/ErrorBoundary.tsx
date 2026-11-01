import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Global og modulær Error Boundary for Filosofradaren.
 * Fanger uventede runtime-feil i React-treet og viser en verdig kosmisk fallback
 * i stedet for at hele applikasjonen krasjer til hvit skjerm.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    // Unngå console.error i produksjon, men nyttig for inspeksjon under testing
    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary fanget feil:', error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleReload = (): void => {
    window.location.reload();
  };

  handleGoHome = (): void => {
    window.location.href = window.location.pathname;
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <main
          role="alert"
          aria-live="assertive"
          className="min-h-screen bg-cosmos text-star-bright flex flex-col items-center justify-center p-6 selection:bg-gold/30"
        >
          <div className="max-w-lg w-full bg-slate-900/80 border border-gold/30 rounded-2xl p-8 backdrop-blur shadow-2xl text-center space-y-6">
            {/* Kosmisk ikon */}
            <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-3xl">
              🔭
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gold tracking-wide">
                Kosmisk forstyrrelse oppsto
              </h1>
              <p className="text-sm text-star-dim">
                Observatoriet møtte en uventet feil under beregningen. Ingen data har gått tapt, men
                visningen ble avbrutt.
              </p>
            </div>

            {/* Handlingsknapper */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-lg bg-gold/20 hover:bg-gold/30 text-gold border border-gold/50 font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold"
              >
                🔄 Prøv igjen
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                🌌 Nullstill visning
              </button>
            </div>

            {/* Teknisk feildetaljer (for revisor / utvikler) */}
            {this.state.error && (
              <details className="text-left mt-6 pt-4 border-t border-slate-800">
                <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-200 focus:outline-none">
                  Teknisk feilinformasjon (for inspeksjon)
                </summary>
                <div className="mt-2 p-3 bg-black/60 rounded border border-slate-800 text-[11px] font-mono text-rose-300 overflow-x-auto max-h-40">
                  <p className="font-semibold">{this.state.error.name}: {this.state.error.message}</p>
                  {this.state.error.stack && (
                    <pre className="mt-1 text-slate-400 text-[10px] whitespace-pre-wrap">
                      {this.state.error.stack}
                    </pre>
                  )}
                </div>
              </details>
            )}
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
