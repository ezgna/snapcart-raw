// Deploy-notify Lambda: paste into AWS Lambda console (or deploy from this file).
export const handler = async (event) => {
  let payload = {};
  try {
    if (event.body) {
      payload = JSON.parse(event.body);
    }
  } catch (e) {
    console.log("Failed to parse body:", e.message);
  }

  console.log(
    JSON.stringify({
      status: payload.status,
      branch: payload.branch,
      commit: payload.commit,
      commit_message: payload.commit_message,
      commit_author_name: payload.commit_author_name,
      commit_author_email: payload.commit_author_email,
      pushed_by: payload.pushed_by,
      timestamp: payload.timestamp,
      repository: payload.repository,
      workflow: payload.workflow,
      run_id: payload.run_id,
    })
  );

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true }),
  };
};
