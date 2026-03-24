const Avatar = ({ initials, size = "md" }) => {
  const sz = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";

  return (
    <div className={`${sz} rounded-xl bg-[#ede9ff] text-[#6a5acd] font-semibold flex items-center justify-center`}>
      {initials}
    </div>
  );
};

export default Avatar;