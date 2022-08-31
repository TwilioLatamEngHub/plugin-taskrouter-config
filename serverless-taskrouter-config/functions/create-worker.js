const path = Runtime.getFunctions()['response-header'].path
const response = require(path).response()

exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient()
  const workspaceSid = context.WORKSPACE_SID

  const { friendlyName, activitySid, attributes } = event

  await client.taskrouter.v1
    .workspaces(workspaceSid)
    .workers.create({ friendlyName, activitySid, attributes })
    .then(worker => response.setBody({ worker }))
    .then(() => callback(null, response))
    .catch(error => callback(error))
}
