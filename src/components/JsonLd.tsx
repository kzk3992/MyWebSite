/** JSON-LD構造化データを <script type="application/ld+json"> で埋め込む共通部品。 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
