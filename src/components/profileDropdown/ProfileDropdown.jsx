import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { LogOut } from "lucide-react";

const ProfileDropdown = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full">
          <img
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
            src={user && user?.photoURL}
            alt="profile-image"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full">
            <img
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
              src={user && user?.photoURL}
              alt="profile-image"
            />
          </div>
          <DropdownMenuLabel className="text-lg">
            Shoptorshi Chowdhury
          </DropdownMenuLabel>
        </div>
        <DropdownMenuItem>shoptorshichowdhury.info@gmail.com</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logOut}>
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
