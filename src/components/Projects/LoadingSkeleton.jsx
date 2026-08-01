// Renders a loading placeholder while project content is being fetched.
export default function LoadingSkeleton() {
  return (
    <div className="project-card">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text short"></div>
    </div>
  );
}
