const variants = {
  primary: "bg-black text-white",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
};

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
};

export default function Button(props) {
  const { variant = "primary", size = "md", class: className, children, ...rest } = props;

  const classes = [
    "rounded-lg",
    "cursor-pointer",
    "font-medium",
    "text-center",
    "transition-colors",
    "duration-200",
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button class={classes} {...rest}>
      {children}
    </button>
  );
}