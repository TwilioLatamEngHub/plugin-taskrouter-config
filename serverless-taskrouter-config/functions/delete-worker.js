const path = Runtime.getFunctions()['response-header'].path
const response = require(path).response()

exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient()
  const workspaceSid = context.WORKSPACE_SID

  const { workerSid } = event

  try {
    await client.taskrouter.v1
      .workspaces(workspaceSid)
      .workers(workerSid)
      .remove()

    response.setBody({ success: 'Worker deleted' })
    response.setStatusCode(200)
    return callback(null, response)
  } catch (error) {
    response.setBody({ error: error.message })
    response.setStatusCode(500)
    return callback(null, response)
  }
}
