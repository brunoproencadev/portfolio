import { expect, test } from "vitest";
import { profile, projects, sections, skills } from "../../src/data/portfolio";

test("editorial data links only to confirmed contacts and public repositories", () => {
  expect(projects).toHaveLength(3);
  expect(new Set(projects.map((project) => project.slug)).size).toBe(3);
  for (const project of projects) {
    const url = new URL(project.repository);
    expect(url.protocol).toBe("https:");
    expect(url.hostname).toBe("github.com");
    expect(url.pathname).toMatch(/^\/brunoproencadev\/[a-z0-9-]+$/);
    expect(project.status.length).toBeGreaterThan(0);
    expect(project.evidence.length).toBeGreaterThan(0);
    expect(project.stack.length).toBeGreaterThan(0);
  }
  for (const link of profile.links)
    expect(["https:", "mailto:"]).toContain(new URL(link.href).protocol);
  for (const skill of skills)
    expect(
      projects.some((project) => project.slug === skill.project.slug),
    ).toBe(true);
  expect(new Set(sections.map((section) => section.id)).size).toBe(
    sections.length,
  );
});
