import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { SiteNav } from "./SiteNav";

export function SiteHeader() {
  return (
    <SiteNav
      name={profile.shortName}
      initials={profile.initials}
      projects={projects.map(({ slug, number, title }) => ({ slug, number, title }))}
    />
  );
}
