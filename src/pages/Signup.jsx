import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Signup = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Create Account ✨
            </h1>
            <p className="text-gray-500 text-sm">
              Join DED-Kost and find your ideal place to stay
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full name"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
              onClick={(e) => {
                e.preventDefault();
                console.log("Signup clicked");
              }}
            >
              Sign Up
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="text-sm text-center text-gray-600 mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Signup;
