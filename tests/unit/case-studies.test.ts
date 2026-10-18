import { expect, test } from "vitest";
import { caseProjects, getCaseStudy } from "../../src/data/case-studies";

test("every published case preserves its project identity and pinned evidence", () => {
  expect(caseProjects.map(({ slug }) => slug)).toEqual([
    "robosense-lab",
    "museu-arte-moderna",
    "industry-week-senai",
    "atelie-ingrid-xavier",
  ]);
  for (const project of caseProjects) {
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

test("museum credits and future presentation remain distinct from repository evidence", () => {
  const museum = getCaseStudy("museu-arte-moderna");
  expect(museum).toBeDefined();
  expect(museum!.contributors).toEqual([
    "Bruno Proença Silva",
    "Rodrigo Andrade",
    "Miguel Narvais",
    "Rafael Domingues",
    "Maria Vitorino",
  ]);
  expect(museum!.status).toContain("Apresentação prevista para 2026");
  expect(museum!.narrativeSource).toContain("relato de Bruno Proença Silva");
  expect(museum!.narrativeSource).toContain("ainda não aconteceu");
  expect(
    museum!.sources.some(({ path }) => path.endsWith("MuseumScene.unity")),
  ).toBe(true);
  expect(museum!.media[0].src).toContain("/museu-arte-moderna/");
  expect(museum!.diagramDescription).toBeNull();
  expect(getCaseStudy("kord")).toBeUndefined();
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
