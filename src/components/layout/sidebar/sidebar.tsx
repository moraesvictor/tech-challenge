export const Sidebar = () => {
  return (
    <nav className="w-64 h-screen bg-gray-100 flex flex-col p-4">
      <a href="/dashboard" className="mb-2 hover:text-blue-600">
        Dashboard
      </a>
      <a href="/transactions" className="mb-2 hover:text-blue-600">
        Transações
      </a>
    </nav>
  );
};
