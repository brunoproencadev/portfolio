import Image from "next/image";

export function LinkIcon({
  name,
}: {
  name: "GitHub" | "LinkedIn" | "E-mail" | "arrow" | "turn" | "up";
}) {
  if (name === "GitHub" || name === "LinkedIn")
    return (
      <Image
        className="link-brand-icon"
        src={`/images/tools/${name.toLowerCase()}.svg`}
        alt=""
        width={20}
        height={20}
      />
    );
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d={
          name === "E-mail"
            ? "M3 5h18v14H3zM3 6l9 7 9-7"
            : name === "turn"
              ? "M5 3v14h14m-6-6 6 6-6 6"
              : name === "up"
                ? "M12 21V3m-7 7 7-7 7 7"
                : "M5 19 19 5M5 5h14v14"
        }
      />
    </svg>
  );
}
