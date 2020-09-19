const core = require('@actions/core');
const csvtomd = require('csvtomd-lib');

try {
  const csvinput = core.getInput('csvinput');
  console.log(`CSV Input given:\n${csvinput}`);
  const markdownTable = csvtomd.fromString(csvinput);
  console.log(`Markdown table Created:\n${markdownTable}`);
  core.setOutput('markdown-table', markdownTable);
} catch (error) {
  core.setFailed(error.message);
}
