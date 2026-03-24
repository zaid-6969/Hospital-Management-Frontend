const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur flex justify-between items-center px-6 h-16 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC45QuwKQNsVVUApKdGXJR9f1PgN9zYBK1wP16uba4MS-drK3t1WoPE5u08kRQt2K-v9C-WK6KS0ncOLXQE7IWxjGHSJRUSK98np10hRcA0c5QxGhs9iKhhEp5NZvWNUGnHywgT6d0Oc3D5U9R2Pr8W_ax3eudJ1-KGeTExpQb5u2PRa_k3RxUJJhytDQ7ndYfptDFsGol6I55AaqDF_X8xf6pm1T-qam7ONi4zIEBx4X94CiV4IgAJWlhKlfNo-udUkJ-UbfGqT0"
          className="w-10 h-10 rounded-full"
        />
        <h2 className="font-bold text-indigo-700">
          Clinical Sanctuary
        </h2>
      </div>

      <button className="text-indigo-600 text-xl">🔔</button>
    </header>
  );
};

export default Header;