'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@/lib/logger';
import { Button } from '@/ui/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logger.error('React boundary captured an error.', error, { componentStack: info.componentStack });
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white">
          <p className="text-lg font-semibold">Une erreur est survenue.</p>
          <p className="text-sm opacity-70">La section sera rechargée. Si le problème persiste, contactez contact@aidyn.ai.</p>
          <Button onClick={this.handleRetry} intent="secondary">
            Réessayer
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
