import ProfileDropdown from "@/components/profileDropdown/ProfileDropdown";
import { TaskSidebar } from "@/components/taskSidebar/TaskSidebar";
import { ModeToggle } from "@/components/theme-change/mode-toggler";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="font-inter overflow-x-auto">
      <SidebarProvider>
        <TaskSidebar />
        <SidebarInset>
          <header className="flex items-center gap-2 border-b">
            <SidebarTrigger className="ml-2" />
            {/* navbar */}
            <div className="w-full">
              <div className="py-4 flex items-center justify-between pl-3 pr-5 md:pr-8 lg:pr-10">
                {/* name */}
                <p className="text-xl text-primary font-medium">
                  Hi, {user ? user?.displayName : "Task Flow"}!
                </p>
                {/* profile & mode button */}
                <div className="flex items-center gap-5">
                  {/* profile dropdown */}
                  <div>
                    <ProfileDropdown />
                  </div>
                  {/* toggler */}
                  <div>
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* outlet content */}
          <section className="w-11/12 mx-auto">
            <Outlet></Outlet>
          </section>
          
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
