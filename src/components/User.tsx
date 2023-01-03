export function User({ user }) {
  console.log({ user });

  return (
    <div className="inline-flex items-center h-10 rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 space-x-2">
      <img className="rounded-full h-8 w-8" src={user.image}></img>
      <span>{user.name}</span>
    </div>
  );
}
