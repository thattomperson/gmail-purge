import Link from 'next/link';

export function NavLink({ children, ...props }) {
  return props.href ? (
    <Link
      {...props}
      className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </Link>
  ) : (
    <button
      {...props}
      className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </button>
  );
}
