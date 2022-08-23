import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

export interface TaskRouterConfigContextData {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

interface TaskRouterConfigContentProviderProps {
  children: React.ReactNode
}

export const TaskRouterConfigContext = createContext(
  {} as TaskRouterConfigContextData
)

export const TaskRouterConfigContentProvider = ({
  children
}: TaskRouterConfigContentProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const taskRouterConfigContextDefaultValue = { isLoading, setIsLoading }

  return (
    <TaskRouterConfigContext.Provider
      value={taskRouterConfigContextDefaultValue}
    >
      {children}
    </TaskRouterConfigContext.Provider>
  )
}
