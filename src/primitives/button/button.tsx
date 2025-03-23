import { tw } from '@/utils';

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  iconOnly?: boolean;
  variant?: ButtonVariant;
};

export const Button = ({
  className,
  children,
  iconOnly = false,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={tw(
        'flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent font-medium disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary'
          ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
          : variant === 'secondary'
            ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-100'
            : variant === 'destructive'
              ? 'bg-red-100 text-red-600 hover:bg-red-200 active:bg-red-100'
              : variant === 'outline'
                ? 'border-gray-300 bg-transparent text-gray-900 hover:bg-gray-200 active:bg-gray-100'
                : '',
        iconOnly ? 'p-3' : 'px-4 py-2.5',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
