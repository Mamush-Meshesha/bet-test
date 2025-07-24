const Index = () => {
  return (
    <>
      <div className="flex justify-end items-center p-4">
        <nav className="space-x-4">
          <a
            href="/login"
            className="text-[#fff] hover:text-[#fff] font-medium transition-colors"
          >
            Login
          </a>
          <span className="text-gray-400">|</span>
          <a
            href="/register"
            className="text-[#fff] hover:text-[#fff] font-medium transition-colors"
          >
            Sign Up
          </a>
        </nav>
      </div>
      <div>Betting Home</div>
    </>
  );
};

export default Index;
