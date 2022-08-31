import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

interface WorkersConfigContextData {
  workspaceName: string
  setWorkspaceName: Dispatch<SetStateAction<string>>
  activities: any[]
  setActivities: Dispatch<SetStateAction<any[]>>
  friendlyName: string
  setFriendlyName: Dispatch<SetStateAction<string>>
  activitySid: string
  setActivitySid: Dispatch<SetStateAction<string>>
  attributes: string
  setAttributes: Dispatch<SetStateAction<string>>
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
  const [friendlyName, setFriendlyName] = useState<string>('')
  const [activitySid, setActivitySid] = useState<string>('')
  const [attributes, setAttributes] = useState<string>(JSON.stringify({}))

  const workersConfigContextDefaultValue = {
    workspaceName,
    setWorkspaceName,
    activities,
    setActivities,
    friendlyName,
    setFriendlyName,
    activitySid,
    setActivitySid,
    attributes,
    setAttributes
  }

  return (
    <WorkersConfigContext.Provider value={workersConfigContextDefaultValue}>
      {children}
    </WorkersConfigContext.Provider>
  )
}
