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

  // Include nulls so missing fields still show in CloudWatch (JSON.stringify drops undefined)
  console.log(
    JSON.stringify({
      status: payload.status ?? null,
      branch: payload.branch ?? null,
      commit: payload.commit ?? null,
      commit_message: payload.commit_message ?? null,
      commit_author_name: payload.commit_author_name ?? null,
      commit_author_email: payload.commit_author_email ?? null,
      pushed_by: payload.pushed_by ?? null,
      timestamp: payload.timestamp ?? null,
      repository: payload.repository ?? null,
      workflow: payload.workflow ?? null,
      run_id: payload.run_id ?? null,
    })
  );

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true }),
  };
};
