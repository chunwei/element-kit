import * as React from 'react'
import {
  ArchiveX,
  ChevronRight,
  Command,
  File,
  Inbox,
  Moon,
  Send,
  Squircle,
  Sun,
  Trash2
} from 'lucide-react'

import { NavUser } from '@/components/nav-user'
import { Label } from '@/components/ui/label'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from '@/components/ui/sidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeMode, THEMEPRESETS } from '@/themes/themes'
import { useCallback } from 'react'
import ColorPicker from './color-picker'
import { useTheme } from '@/context/ThemeContext'
import { RadiusSelector } from './radius-selector'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from './ui/collapsible'
import { capitalizeFirstLetter } from '@/lib/capitalize'
import NavActions from './nav-actions'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    theme: activeTheme,
    setTheme: setActiveTheme,
    globalMode,
    setGlobalMode
  } = useTheme()
  console.log({ globalMode })
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  // const [activeTheme, setActiveTheme] = React.useState(THEMEPRESETS[0])
  const { setOpen } = useSidebar()

  const onColorChange = useCallback(
    (key: string, mode: 'light' | 'dark') => (v: string) => {
      setActiveTheme((t: any) => ({
        ...t,
        colors: { ...t.colors, [mode]: { ...t.colors[mode], [key]: v } }
      }))
      console.log(mode, key, v)
    },
    [setActiveTheme]
  )

  const renderColorPickers = useCallback(
    (colors: Record<string, string>, mode: 'light' | 'dark') => {
      const baseKeys: string[] = []
      Object.keys(colors).map((key) => {
        const baseKey = key.replace('Foreground', '')
        if (!baseKeys.includes(baseKey)) baseKeys.push(baseKey)
      })
      return baseKeys.map((baseKey) => {
        const fgKey = baseKey + 'Foreground'
        return (
          // <div
          //   key={baseKey}
          //   className="flex items-center justify-between gap-4"
          // >
          <Collapsible
            key={baseKey}
            // title={baseKey}
            asChild
            // defaultOpen
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={baseKey}>
                  <Label className="flex-1 flex items-center justify-between pr-6">
                    {capitalizeFirstLetter(baseKey)}
                    <div className="flex items-center gap-2">
                      {colors[fgKey] && (
                        <div
                          className="w-4 h-4 border rounded "
                          style={{ background: `hsl(${colors[fgKey]})` }}
                        ></div>
                      )}
                      <div
                        className="w-4 h-4 border rounded "
                        style={{ background: `hsl(${colors[baseKey]})` }}
                      ></div>
                    </div>
                  </Label>

                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  <div className="grid grid-cols-2 gap-4">
                    {/* background */}
                    <SidebarMenuSubItem key={'Background Color'}>
                      <SidebarMenuSubButton asChild>
                        <>
                          <Label className="text-muted-foreground text-xs">
                            {colors[fgKey] ? 'Background' : 'Color'}
                          </Label>
                          <ColorPicker
                            value={colors[baseKey]}
                            onChange={onColorChange(baseKey, mode)}
                          />
                        </>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    {/* foreground */}
                    {colors[fgKey] && (
                      <SidebarMenuSubItem key={'Text Color'}>
                        <SidebarMenuSubButton asChild>
                          <>
                            <Label className="text-muted-foreground text-xs">
                              {'Foreground'}
                            </Label>
                            <ColorPicker
                              value={colors[fgKey]}
                              onChange={onColorChange(fgKey, mode)}
                            />
                          </>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )}
                  </div>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          // <Label className="w-32">{baseKey}</Label>
          // </div>
        )
      })
    },
    [onColorChange]
  )

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Element Kit</span>
                    <span className="truncate text-xs">
                      NFT Marketplace UI Kit
                    </span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {THEMEPRESETS.slice(0, 10).map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.name,
                        hidden: false
                      }}
                      onClick={() => {
                        setActiveTheme(item)
                        setOpen(true)
                      }}
                      isActive={activeTheme.name === item.name}
                      className="px-2.5 md:px-2"
                    >
                      {/* <item.icon /> */}
                      <Squircle
                        className="rounded-md"
                        style={{
                          color: `hsl(${item.colors.dark.primary})`
                        }}
                      />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavActions />
          {/* <NavUser
            user={{ name: 'cwlu', email: 'luchunwei@gmail.com', avatar: '' }}
          /> */}
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-3">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeTheme.name}
            </div>
            <Label className="flex items-center gap-2 text-sm">
              <span>Mode</span>
              <Tabs
                defaultValue={globalMode}
                value={globalMode}
                onValueChange={(mode) => setGlobalMode(mode as ThemeMode)}
              >
                <TabsList className="h-7  gap-1.5 rounded-md  p-1 mr-2">
                  <TabsTrigger
                    value="light"
                    className="h-[22px] w-[22px] rounded-sm p-0"
                  >
                    <Sun className="h-3.5 w-3.5" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="dark"
                    className="h-[22px] w-[22px] rounded-sm p-0"
                  >
                    <Moon className="h-3.5 w-3.5" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              {/* <Switch className="shadow-none" /> */}
            </Label>
          </div>
          {/* <SidebarInput placeholder="Type to search..." /> */}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupLabel>Radius</SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <RadiusSelector
                value={activeTheme.radius}
                onChange={(radius) =>
                  setActiveTheme({ ...activeTheme, radius })
                }
              ></RadiusSelector>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="px-0">
            <SidebarGroupLabel>Colors</SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <Tabs defaultValue="light">
                <TabsList className="grid  grid-cols-2">
                  <TabsTrigger value="light">Light</TabsTrigger>
                  <TabsTrigger value="dark">Dark</TabsTrigger>
                </TabsList>
                <TabsContent value="light" className="space-y-2 p-3">
                  <SidebarMenu>
                    {renderColorPickers(activeTheme.colors.light, 'light')}
                  </SidebarMenu>
                </TabsContent>
                <TabsContent value="dark" className="space-y-2 p-3">
                  <SidebarMenu>
                    {renderColorPickers(activeTheme.colors.dark, 'dark')}
                  </SidebarMenu>
                </TabsContent>
              </Tabs>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
