import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    asChild?: boolean;
  };

const buttonStyles = cva(
  'inline-flex items-center justify-center rounded-full border border-transparent font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
  {
    variants: {
      intent: {
        primary:
          'bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/30 hover:from-cyan-400 hover:via-sky-400 hover:to-indigo-400 focus-visible:ring-sky-300',
        secondary:
          'bg-white/10 text-white border-white/20 hover:bg-white/20 focus-visible:ring-white/40 backdrop-blur',
        ghost: 'bg-transparent text-white hover:bg-white/10 focus-visible:ring-white/30',
      },
      size: {
        md: 'px-5 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
        icon: 'p-2',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? 'span' : 'button';
    return (
      <Component
        ref={ref as never}
        className={clsx(buttonStyles({ intent, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonStyles };
