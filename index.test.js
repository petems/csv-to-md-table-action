const process = require('process');
const cp = require('child_process');
const path = require('path');

const csvString = `
Name,Position,Wanted
"Andromedus, Darrow au",Leader,Yes
"Augustus, Victoria au",Accomplice,Yes
`.trim();

const expectedLog = `CSV Input given:
Name,Position,Wanted
"Andromedus, Darrow au",Leader,Yes
"Augustus, Victoria au",Accomplice,Yes
Markdown table Created:
| Name                  | Position   | Wanted |
| --------------------- | ---------- | ------ |
| Andromedus, Darrow au | Leader     | Yes    |
| Augustus, Victoria au | Accomplice | Yes    |
::set-output name=markdown-table::| Name                  | Position   | Wanted |%0A| --------------------- | ---------- | ------ |%0A| Andromedus, Darrow au | Leader     | Yes    |%0A| Augustus, Victoria au | Accomplice | Yes    |
`;

// shows how the runner will run a javascript action with env / stdout protocol
test('parses csv and converts to valid markdown table', () => {
  process.env.INPUT_CSVINPUT = csvString;
  const markdownTable = path.join(__dirname, 'index.js');
  const actionLog = cp.execSync(`node ${markdownTable}`, { env: process.env }).toString();
  expect(actionLog).toBe(expectedLog);
});
