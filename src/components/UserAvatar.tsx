
import { User } from "../types/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  user: User;
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  // Generate initials from the user's full name
  const getInitials = () => {
    return user.fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start">
      <div className="relative mb-3 sm:mb-0">
        <Avatar className="w-16 h-16">
          {user.profileImage ? (
            <AvatarImage src={user.profileImage} alt={user.fullName} />
          ) : null}
          <AvatarFallback className="text-xl">{getInitials()}</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-1 w-5 h-5 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </div>
      </div>
      <div className="text-center sm:text-left sm:ml-4">
        <h3 className="font-medium">{user.fullName}</h3>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
    </div>
  );
};

export default UserAvatar;
