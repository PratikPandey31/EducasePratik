
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const validateForm = () => {
    const newErrors = {
      email: !email || !email.includes("@"),
      password: !password,
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const success = signIn(email, password);
      
      if (success) {
        toast({
          title: "Signed in",
          description: "You have successfully signed in.",
        });
        navigate("/profile");
      } else {
        toast({
          title: "Sign in failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Layout>
      <div className="p-4 sm:p-6 flex flex-col justify-between min-h-screen">
        <div className="mt-4 sm:mt-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Sign in to your PopX account</h1>
          <p className="text-gray-500 mb-6 sm:mb-8">
            Enter your credentials to access your account
          </p>
          
          <form onSubmit={handleSubmit}>
            <FormField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: false });
              }}
              placeholder="Enter email address"
              className={errors.email ? "border-red-500" : ""}
            />
            
            <FormField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: false });
              }}
              placeholder="Enter password"
              className={errors.password ? "border-red-500" : ""}
            />
            
            <button
              type="submit"
              className="w-full py-3 bg-gray-300 text-white rounded-md font-medium hover:bg-gray-400 transition-colors mt-6"
            >
              Login
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <button 
              onClick={() => navigate("/")} 
              className="text-purple-600 hover:underline"
            >
              Back to welcome page
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
