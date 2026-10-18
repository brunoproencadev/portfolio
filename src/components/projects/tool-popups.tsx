import Image from "next/image";
import { toolIcons } from "@/data/project-media";
import { additionalToolIcons } from "@/data/additional-projects";

const icons = {
  ...toolIcons,
  ...additionalToolIcons,
  "Claude Code": "/images/tools/clawd.svg",
};

export function ToolPopups({
  tools,
  name,
  assistants = ["Claude Code"],
}: {
  tools: readonly (keyof typeof icons)[];
  name: string;
  assistants?: readonly "Claude Code"[];
}) {
  return (
    <ul className="tool-popups" aria-label={`Ferramentas usadas no ${name}`}>
      {[...new Set([...tools, ...assistants])].map((tool) => (
        <li key={tool} data-project-tool aria-label={tool}>
          <Image src={icons[tool]} alt="" width={40} height={40} />
        </li>
      ))}
    </ul>
  );
}
