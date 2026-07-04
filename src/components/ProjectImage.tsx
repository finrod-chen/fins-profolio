import { useState } from "react";
import type { Project } from "@/types";
import { SitePlaceholder } from "./SitePlaceholder";

/**
 * ProjectImage — resolves the best available preview for a project:
 *   1. an explicit local screenshot (highest priority)
 *   2. the live site's OG image (project.ogImage)
 *   3. the generated SitePlaceholder name card (fallback)
 *
 * If the chosen remote image fails to load at runtime, we fall back to
 * the placeholder so a broken/removed image never shows a broken icon.
 */
export function ProjectImage({
  project,
  loading,
}: {
  project: Project;
  loading?: "lazy" | "eager";
}) {
  const src = project.screenshot ?? project.ogImage;
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <SitePlaceholder project={project} />;
  }

  return (
    <img
      src={src}
      alt={`${project.title} 預覽`}
      className="w-full h-full object-cover"
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
