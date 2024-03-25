interface IButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}

const Button = ({ onClick, children, title }: IButtonProps) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className="bg-white px-5 border hover:border-[#0078EE] transition-all duration-150 rounded-[10px] hover:text-[#0078EE]"
    >
      {children}
    </button>
  );
};

export default Button;
