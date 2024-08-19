interface HeaderWithTitleProps {
  title: string;
  className?: string;
}
const HeaderWithTitle: React.FC<HeaderWithTitleProps> = ({
  title,
  className,
}) => {
  return (
    <header className={`${className} flex justify-start text-2xl  font-bold `}>
      {title}
    </header>
  );
};
export default HeaderWithTitle;
