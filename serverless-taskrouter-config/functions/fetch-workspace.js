const path = Runtime.getFunctions()['response-header'].path
const response = require(path).response()

exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient()
  const workspaceSid = context.WORKSPACE_SID

  await client.taskrouter.v1
    .workspaces(workspaceSid)
    .fetch()
    .then(
      async workspace =>
        await client.taskrouter.v1
          .workspaces(workspaceSid)
          .activities.list()
          .then(activities =>
            response.setBody({
              workspaceName: workspace.friendlyName,
              activities
            })
          )
    )
    .then(() => callback(null, response))
    .catch(error => {
      console.log(error)
      return callback(error)
    })
}
