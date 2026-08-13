const Navbar = () => {
  return (
    <>
      <nav className="flex items-center justify-between border-b border-border bg:surface px-8 py-4">
        <div className="">
          <h1 className="text-xl font-bold text-heading">Memory Atlas</h1>
        </div>
        <div className="flex items-center gap-6">
          <p className="cursor-pointer text-muted hover:text-primary">Search</p>
          <p className="cursor-pointer text-muted hover:text-primary">
            Notification
          </p>
          <select className="rounded-lg border border-border bg-surface px-3 py-2 text-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
            <option value="profile">Profile</option>
            <option value="settings">Settings</option>
            <option value="logout">Logout</option>
          </select>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
