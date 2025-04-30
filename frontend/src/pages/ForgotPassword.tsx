
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center">
            <ForgotPasswordForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
