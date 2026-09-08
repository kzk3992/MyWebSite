import type { LegalSection } from "@/content/en";
import { OperatorInformation } from "./OperatorInformation";

export function LegalSections({ sections }: { sections: readonly LegalSection[] }) {
  return sections.map((section, index) => (
    <section key={section.title}>
      <h2>{section.title}</h2>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.items && (
        <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
      )}
      {index === sections.length - 1 && <OperatorInformation locale="en" />}
    </section>
  ));
}
