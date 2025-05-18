
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import UserAvatar from "../components/UserAvatar";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenIcon, Camera, ArrowLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
  const { currentUser, signOut, updateUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: currentUser?.fullName || "",
    phoneNumber: currentUser?.phoneNumber || "",
    email: currentUser?.email || "",
    companyName: currentUser?.companyName || "",
    summary: currentUser?.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!currentUser) {
    navigate("/");
    return null;
  }

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handleSave = () => {
    updateUser({
      ...currentUser,
      ...profileData,
      profileImage: previewUrl,
    });
    
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <Layout>
      <div className="shadow rounded-lg max-w-lg mx-auto">
        <div className="border-b p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-medium mb-3 sm:mb-0">Account Settings</h2>
          {!isEditing ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <PenIcon size={16} />
              Edit Profile
            </Button>
          ) : (
            <Button 
              variant="default" 
              size="sm"
              onClick={handleSave}
              className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto mt-2 sm:mt-0"
            >
              Save Changes
            </Button>
          )}
        </div>
        
        <div className="p-4 sm:p-6 border-b">
          {isEditing ? (
            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-2">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : currentUser.profileImage ? (
                    <img src={currentUser.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-gray-700">
                      {currentUser.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .substring(0, 2)}
                    </div>
                  )}
                </div>
                
                <label className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                  <Camera size={16} className="text-white" />
                </label>
              </div>
              <span className="text-sm text-gray-500 mt-2">Upload a new photo</span>
            </div>
          ) : (
            <div className="flex justify-center sm:justify-start">
              <UserAvatar user={currentUser} />
            </div>
          )}
          
          <div className="mt-6">
            {isEditing ? (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <Input
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <Input
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <Input
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <Input
                    name="companyName"
                    value={profileData.companyName}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Personal Summary</label>
                  <Textarea
                    name="summary"
                    value={profileData.summary}
                    onChange={handleChange}
                    placeholder="Write something about yourself"
                    rows={4}
                  />
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {currentUser.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between p-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center p-2 border rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
