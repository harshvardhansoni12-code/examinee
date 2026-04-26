export const Background = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-background">
      {/* Warm ambient glows */}
      <div 
        className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-amber-200/40 rounded-full blur-[120px] opacity-70 animate-float" 
        style={{ animationDuration: '8s' }} 
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-200/40 rounded-full blur-[140px] opacity-60 animate-float" 
        style={{ animationDuration: '10s', animationDelay: '2s' }} 
      />
      <div 
        className="absolute top-[30%] right-[20%] w-[35%] h-[35%] bg-rose-200/30 rounded-full blur-[100px] opacity-50 animate-float" 
        style={{ animationDuration: '12s', animationDelay: '4s' }} 
      />
      <div 
        className="absolute bottom-[20%] left-[20%] w-[40%] h-[40%] bg-yellow-100/40 rounded-full blur-[110px] opacity-50 animate-float" 
        style={{ animationDuration: '9s', animationDelay: '1s' }} 
      />
    </div>
  );
};
