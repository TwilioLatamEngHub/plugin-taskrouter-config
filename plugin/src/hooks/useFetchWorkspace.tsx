import { useContext, useState } from 'react'

import { fetchWorkspace } from '../services'
import { TaskRouterConfigContext } from '../contexts'

interface UseFetchWorkspaceReturn {
  workspaceName: string
  activities: Array<any>
  getWorkspace: () => Promise<void>
}

export const useFetchWorkspace = (): UseFetchWorkspaceReturn => {
  const { setIsLoading } = useContext(TaskRouterConfigContext)
  const [workspaceName, setWorkspaceName] = useState<string>('')
  const [activities, setActivities] = useState<[]>([])

  const getWorkspace = async () => {
    await fetchWorkspace()
      .then(res => {
        setWorkspaceName(res.workspaceName)
        setActivities(res.activities)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }

  return { workspaceName, activities, getWorkspace }
}
