import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar'
import { Settings } from 'lucide-react'

function NavActions() {
  return (
    <SidebarMenu>
      <SidebarMenuItem key="settings">
        <SidebarMenuButton asChild>
          <a href={''}>
            <Settings />
            <span>Settings</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default NavActions
