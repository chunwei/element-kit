import { AppSidebar } from '@/components/app-sidebar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { SweepModal, ElementKitProvider } from '@element-kit/ui'
import { useEffect, useRef, useState } from 'react'
import { sweepModalDemoData } from '@/mock/demo-collection'
import { Monitor, Smartphone } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import ThemeModeSwitcher from '@/components/theme-mode-switcher'
import '@/index.css'
import CodeViewer from '@/components/code-viewer'

export default function ThemeBuilder() {
  const modalContainerRef = useRef<HTMLDivElement>(null)
  const [isContainerReady, setIsContainerReady] = useState(false)

  useEffect(() => {
    if (modalContainerRef.current) {
      setIsContainerReady(true)
    }
  }, [])
  const [activeDemoTab, setActiveDemoTab] = useState('demo')
  const [activeResponsiveTab, setActiveResponsiveTab] = useState('desktop')
  console.log({ isContainerReady, activeResponsiveTab })
  const { theme } = useTheme()
  // console.log('theme-builder page', { theme })
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '350px'
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <Tabs defaultValue="demo" onValueChange={setActiveDemoTab}>
              <TabsList>
                <TabsTrigger value="demo">Priview</TabsTrigger>
                <TabsTrigger value="components">Code</TabsTrigger>
              </TabsList>
            </Tabs>
            {activeDemoTab === 'demo' && (
              <>
                <Tabs
                  defaultValue="desktop"
                  onValueChange={setActiveResponsiveTab}
                >
                  <TabsList className="h-7  gap-1.5 rounded-md  p-1 mr-2">
                    <TabsTrigger
                      value="desktop"
                      className="h-[22px] w-[22px] rounded-sm p-0"
                    >
                      <Monitor className="h-3.5 w-3.5" />
                    </TabsTrigger>
                    <TabsTrigger
                      value="mobile"
                      className="h-[22px] w-[22px] rounded-sm p-0"
                    >
                      <Smartphone className="h-3.5 w-3.5" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </>
            )}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-1  gap-4 min-h-[100vh] rounded-xl bg-muted/50 md:min-h-min bg-dots ">
            <style>{`.ek-themes-wrapper{
                width:100%;
                display:block;
              }
              `}</style>

            <ElementKitProvider
              config={{
                theme,
                locale: 'zh-CN',
                debug: process.env.NODE_ENV === 'development',
                apiKey: import.meta.env.VITE_ELEMENT_API_KEY
              }}
            >
              <div
                ref={modalContainerRef}
                className="relative w-full h-full flex-1 flex items-center justify-center"
              >
                {activeDemoTab === 'demo' ? (
                  <>
                    <div className=" absolute top-4 left-4 ">
                      <ThemeModeSwitcher />
                    </div>
                    isContainerReady && (
                    <SweepModal
                      {...sweepModalDemoData}
                      portalContainer={modalContainerRef.current}
                      overlayClass="rounded-xl"
                      defaultOpen
                      dev
                    />
                    )
                  </>
                ) : (
                  <CodeViewer className="max-h-[calc(100svh-84px)]" />
                )}
              </div>
            </ElementKitProvider>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
