import Image from "next/image";
import { toolIcons } from "@/data/project-media";

export function ToolPopups({
  tools,
  name,
}: {
  tools: readonly (keyof typeof toolIcons)[];
  name: string;
}) {
  return (
    <ul className="tool-popups" aria-label={`Ferramentas usadas no ${name}`}>
      {tools.map((tool) => (
        <li key={tool} data-project-tool aria-label={tool}>
          <Image src={toolIcons[tool]} alt="" width={40} height={40} />
        </li>
      ))}
    </ul>
  );
}
