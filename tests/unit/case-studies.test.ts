import { expect, test } from "vitest";
import { getCaseStudy } from "../../src/data/case-studies";
import { projects } from "../../src/data/portfolio";

test("every published case preserves its project identity and pinned evidence", () => {
  for (const project of projects) {
    const study = getCaseStudy(project.slug);
    expect(study?.name).toBe(project.name);
    expect(study?.revision).toMatch(/^[a-f0-9]{40}$/);
    expect(study?.sources.length).toBeGreaterThan(0);
    expect(study?.limitations.length).toBeGreaterThan(0);
    expect(study?.architecture.length).toBeGreaterThan(0);
    for (const source of study!.sources) {
      const url = new URL(
        `${project.repository}/blob/${study!.revision}/${source.path}`,
      );
      expect(url.hostname).toBe("github.com");
      expect(source.path).not.toMatch(/(^\/|\.\.|[?#])/);
    }
  }
});

test("unknown and inherited property names cannot resolve to a case", () => {
  for (const slug of [
    "__proto__",
    "constructor",
    "toString",
    "unknown",
    "",
    "../robosense-lab",
    "RoboSense-Lab",
  ])
    expect(getCaseStudy(slug)).toBeUndefined();
});
