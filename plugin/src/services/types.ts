export interface CreateWorker {
  friendlyName: string
  activitySid: string
  attributes: string
}

export type UpdateWorker = CreateWorker & { workerSid: string }
