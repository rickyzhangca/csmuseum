import { tw } from '@/utils';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'admin';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  iconOnly?: boolean;
  variant?: ButtonVariant;
};

export const Button = ({
  className,
  children,
  iconOnly,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={tw(
        'flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent text-base font-medium disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary'
          ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
          : variant === 'secondary'
            ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-100'
            : variant === 'destructive'
              ? 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
              : variant === 'outline'
                ? 'border-gray-200 bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200'
                : variant === 'admin'
                  ? 'bg-pink-600 text-white hover:bg-pink-700 active:bg-pink-800'
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
