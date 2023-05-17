import { cva, VariantProps } from "class-variance-authority";

const buttonStyles = cva(
    "flex item-center justify-center px-4 py-2 disabled:bg-gray-300 disabled:focus:outline-none transition-all duration-300  rounded-lg font-medium cursor-pointer   focus:ring-2  focus:ring-offset-2",
    {
        variants: {
            variant: {
                primary:
                    "bg-blue-500 text-white focus:ring-blue-500 hover:bg-opacity-90 ",
                secondary: "bg-green-500 text-white hover:bg-green-600",
                danger:
                    "bg-red-500 text-white focus:ring-1 ring-offset-1 focus:ring-red-600 hover:bg-red-600",
                outlined:
                    "bg-white  border-1.5 hover:bg-gray-50 focus:ring-transparent",
            },
            fullWidth: {
                true: "w-full",
            },
            size: {
                sm: "text-sm",
                md: "text-base",
                lg: "text-lg",
            },
        },

        defaultVariants: {
            variant: "primary",
        },
    },
);
interface ButtonProps
    extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
    children: React.ReactNode;
}

function Button(
    { children, variant, size, fullWidth, ...otherProps }: ButtonProps,
) {
    return (
        <button
            // className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            className={buttonStyles({ variant, size, fullWidth })}
            {...otherProps}
        >
            {children}
        </button>
    );
}

export default Button;
