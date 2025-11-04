'use client';

interface LogPayload {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  context?: Record<string, unknown>;
  error?: unknown;
}

const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

type SentryClient = {
  captureException: (error: unknown, context?: Record<string, unknown>) => void;
  captureMessage: (message: string, level: LogPayload['level']) => void;
};

type SentryModule = {
  init: (config: { dsn: string }) => void;
  captureException: SentryClient['captureException'];
  captureMessage: SentryClient['captureMessage'];
};

const dynamicImport = new Function(
  'specifier',
  'return import(specifier);'
) as (specifier: string) => Promise<SentryModule>;

const sentryClientPromise: Promise<SentryClient | null> | null = sentryDsn
  ? dynamicImport('@sentry/nextjs')
      .then((Sentry) => {
        Sentry.init({ dsn: sentryDsn });
        return {
          captureException: Sentry.captureException,
          captureMessage: Sentry.captureMessage,
        };
      })
      .catch((error) => {
        console.warn('Sentry initialisation failed, falling back to console.', error);
        return null;
      })
  : null;

const forwardToSentry = (action: (client: SentryClient) => void) => {
  if (!sentryClientPromise) {
    return;
  }
  void sentryClientPromise.then((client) => {
    if (!client) {
      return;
    }
    action(client);
  });
};

const log = ({ level, message, context, error }: LogPayload) => {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    error,
  };

  if (error) {
    forwardToSentry((client) => client.captureException(error, context));
  } else {
    forwardToSentry((client) => client.captureMessage(message, level));
  }

  const line = `[${payload.timestamp}] [${level.toUpperCase()}] ${message}`;
  if (level === 'error') {
    console.error(line, context, error);
  } else if (level === 'warn') {
    console.warn(line, context);
  } else {
    console.info(line, context);
  }
};

export const logger = {
  info: (message: string, context?: Record<string, unknown>) => log({ level: 'info', message, context }),
  warn: (message: string, context?: Record<string, unknown>) => log({ level: 'warn', message, context }),
  error: (message: string, error?: unknown, context?: Record<string, unknown>) =>
    log({ level: 'error', message, context, error }),
};
