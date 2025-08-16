interface EmoTeenLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const EmoTeenLogo = ({ className = "", size = 'md' }: EmoTeenLogoProps) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeMap[size]} ${className}`}>
      <img 
        src="/lovable-uploads/67E79165-240D-48DD-982D-A8913823506C.png" 
        alt="EmoTeen - Inteligência Emocional"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default EmoTeenLogo;
