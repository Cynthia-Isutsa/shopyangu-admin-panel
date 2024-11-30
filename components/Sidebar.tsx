"use client"


import React from 'react'
import { Nav } from './ui/nav'
import {
    AlertCircle,
    MessagesSquare,
    Users2,
  } from "lucide-react"

interface MailProps {
    defaultCollapsed?: boolean
  }

const Sidebar = ({
    defaultCollapsed = false,
  }: MailProps) => {
   
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
    console.log(setIsCollapsed)
  return (
    <div>
        <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Dashboard",
                icon: Users2,
                href: "/",
                variant: "ghost",
              },
              {
                title: "Shop Management",
                href: "/shop",
                icon: AlertCircle,
                variant: "ghost",
              },
              {
                title: "Product Management",
                href: "/productmanagement",
                icon: MessagesSquare,
                variant: "ghost",
              },
              
            ]}
          />
    </div>
  )
}

export default Sidebar