
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center">
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
