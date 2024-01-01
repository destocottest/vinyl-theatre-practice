export default function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-4 py-2 font-bold text-white  rounded transition-all disabled:opacity-50 ${props.className}`}
    >
      {children}
    </button>
  );
}
