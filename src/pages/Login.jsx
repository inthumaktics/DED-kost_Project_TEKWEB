import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

const Login = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            Login to DED-kost
          </h1>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90"
              onClick={(e) => {
                e.preventDefault();
                console.log("Login clicked");
              }}
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a href="/signup" className="text-primary font-medium">
              Sign Up
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Login;
