import { useContext, useState } from 'react'

import { TaskRouterConfigContext } from '../contexts'

interface UseFetchWorkspaceReturn {
  workspaceName: string
  activities: Array<any>
  fetchWorkspace: () => Promise<void>
}

export const useFetchWorkspace = (): UseFetchWorkspaceReturn => {
  const { setIsLoading } = useContext(TaskRouterConfigContext)
  const [workspaceName, setWorkspaceName] = useState<string>('')
  const [activities, setActivities] = useState<[]>([])

  const fetchWorkspace = async () => {
    await fetch(
      'https://serverless-taskrouter-config-5449-dev.twil.io/fetch-workspace'
    )
      .then(data => data.json())
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

  return { workspaceName, activities, fetchWorkspace }
}
