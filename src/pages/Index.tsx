
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-4 sm:p-6 flex flex-col justify-center min-h-screen">
        <div className="mb-16 sm:mb-24">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome to PopX</h1>
          <p className="text-gray-500 mb-6 sm:mb-8">
            Create an account or login to manage your profile
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate("/signup")}
              className="w-full py-3 sm:py-4 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors"
            >
              Create Account
            </button>
            
            <button
              onClick={() => navigate("/signin")}
              className="w-full py-3 sm:py-4 bg-purple-100 text-purple-800 rounded-md font-medium hover:bg-purple-200 transition-colors"
            >
              Already Registered? Login
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
