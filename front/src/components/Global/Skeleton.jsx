const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse bg-neutral-700/50 rounded ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
