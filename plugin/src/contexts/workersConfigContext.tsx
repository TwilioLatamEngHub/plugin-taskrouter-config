import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

interface WorkersConfigContextData {
  workspaceName: string
  setWorkspaceName: Dispatch<SetStateAction<string>>
  activities: any[]
  setActivities: Dispatch<SetStateAction<any[]>>
}

interface WorkersConfigContentProviderProps {
  children: React.ReactNode
}

export const WorkersConfigContext = createContext(
  {} as WorkersConfigContextData
)

export const WorkersConfigContentProvider = ({
  children
}: WorkersConfigContentProviderProps) => {
  const [workspaceName, setWorkspaceName] = useState<string>('')
  const [activities, setActivities] = useState<any[]>([])

  const workersConfigContextDefaultValue = {
    workspaceName,
    setWorkspaceName,
    activities,
    setActivities
  }

  return (
    <WorkersConfigContext.Provider value={workersConfigContextDefaultValue}>
      {children}
    </WorkersConfigContext.Provider>
  )
}
