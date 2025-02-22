import logo from "../../assets/icons/logo.png";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { LayoutList } from "lucide-react";
import "./TaskSidebar.css";

export function TaskSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex-row items-center justify-center md:py-5">
        <div className="w-10 h-10">
          <img className="w-full h-full object-cover" src={logo} alt="logo" />
        </div>
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-center">
          Task Flow
        </h3>
      </SidebarHeader>
      <SidebarContent className="sidebar">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* 1. taskboard */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink className="font-medium" to="/taskboard" end>
                    <LayoutList /> Taskboard
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
