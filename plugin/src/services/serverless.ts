const FETCH_WORKERS_URL = process.env.FLEX_APP_URL_FETCH_WORKERS
const CREATE_WORKER_URL = process.env.FLEX_APP_URL_CREATE_WORKER
const DELETE_WORKER_URL = process.env.FLEX_APP_URL_DELETE_WORKER

const logError = () =>
  console.error(
    'URL missing, please add the correct functions URLs, restart the server and try again'
  )

export const fetchWorkers = async () => {
  return FETCH_WORKERS_URL
    ? await fetch(FETCH_WORKERS_URL)
        .then(data => data.json())
        .then(res => res.workers)
        .catch(err => err)
    : logError()
}

interface CreateWorker {
  friendlyName: string
  activitySid: string
  attributes: string
}

export const createWorker = async ({
  friendlyName,
  activitySid,
  attributes
}: CreateWorker) => {
  return CREATE_WORKER_URL
    ? await fetch(CREATE_WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friendlyName, activitySid, attributes })
      })
        .then(data => data.json())
        .catch(err => err)
    : logError()
}

export const deleteWorker = async (sid: string) => {
  return DELETE_WORKER_URL
    ? await fetch(`${DELETE_WORKER_URL}?workerSid=${sid}`)
        .then(data => data.json())
        .catch(err => err)
    : logError()
}
