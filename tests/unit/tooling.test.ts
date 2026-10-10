import { ESLint } from "eslint";
import { expect, test } from "vitest";

test("the installed lint plugins evaluate React and accessibility rules", async () => {
  const [result] = await new ESLint().lintText(
    'export default function Sample() { return <img src="/sample.png" />; }',
    { filePath: "src/components/lint-probe.tsx" },
  );
  expect(result.messages.map((message) => message.ruleId)).toContain(
    "jsx-a11y/alt-text",
  );
  expect(result.messages.map((message) => message.ruleId)).toContain(
    "@next/next/no-img-element",
  );
}, 60000);
