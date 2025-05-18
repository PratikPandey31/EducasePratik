
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    companyName: "",
    isAgency: false,
  });
  
  const [errors, setErrors] = useState({
    fullName: false,
    phoneNumber: false,
    email: false,
    password: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    
    // Clear error for this field
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: false,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: !formData.fullName,
      phoneNumber: !formData.phoneNumber,
      email: !formData.email || !formData.email.includes("@"),
      password: !formData.password, // Removed length validation
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      signUp(formData);
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
      navigate("/profile");
    } else {
      toast({
        title: "Form error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">Create your PopX account</h1>
        
        <form onSubmit={handleSubmit} className="mt-6">
          <FormField
            label="Full Name"
            required
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={errors.fullName ? "border-red-500" : ""}
          />
          
          <FormField
            label="Phone number"
            required
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className={errors.phoneNumber ? "border-red-500" : ""}
          />
          
          <FormField
            label="Email address"
            required
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className={errors.email ? "border-red-500" : ""}
          />
          
          <FormField
            label="Password"
            required
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className={errors.password ? "border-red-500" : ""}
          />
          
          <FormField
            label="Company name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter your company name (optional)"
          />
          
          <div className="mb-6">
            <div className="flex items-center">
              <span className="mr-2">Are you an Agency?</span>
              <span className="text-red-500">*</span>
            </div>
            
            <div className="flex space-x-6 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isAgency"
                  checked={formData.isAgency === true}
                  onChange={() => setFormData({ ...formData, isAgency: true })}
                  className="w-5 h-5 accent-purple-600"
                />
                <span className="ml-2">Yes</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isAgency"
                  checked={formData.isAgency === false}
                  onChange={() => setFormData({ ...formData, isAgency: false })}
                  className="w-5 h-5 accent-purple-600"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors mt-4"
          >
            Create Account
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
    </Layout>
  );
};

export default SignUp;
