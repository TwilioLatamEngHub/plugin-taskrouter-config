const path = Runtime.getFunctions()['response-header'].path
const response = require(path).response()

exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient()
  const workspaceSid = context.WORKSPACE_SID

  const { workerSid } = event

  await client.taskrouter.v1
    .workspaces(workspaceSid)
    .workers(workerSid)
    .remove()
    .then(() => callback(null, response))
    .catch(error => callback(error))
}
