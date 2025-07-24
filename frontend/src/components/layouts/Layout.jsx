import Header from "../header";

const AuthLayout = ({ children }) => {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#1f3f67] text-white flex flex-col items-center">
        <img
          src="/tiktok.jpg"
          alt="TikTok Live Fest"
          className="w-full h-[220px] md:h-[340px] object-cover"
        />

        {/* Page content */}
        <div className="w-full max-w-md px-4 py-6">{children}</div>
      </div>
    </>
  );
};

export default AuthLayout;
