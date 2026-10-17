// Sets the document title and an optional noindex directive while mounted.
import { useEffect } from "react";

export default function useDocumentMeta({ title, noindex = false }) {
  useEffect(() => {
    const previous = document.title;
    if (title) document.title = title;

    let robots;
    if (noindex) {
      robots = document.createElement("meta");
      robots.name = "robots";
      robots.content = "noindex";
      document.head.append(robots);
    }

    return () => {
      document.title = previous;
      robots?.remove();
    };
  }, [title, noindex]);
}
