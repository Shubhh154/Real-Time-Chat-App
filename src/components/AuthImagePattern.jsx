//Patern 1
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    // <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
    //   <div className="max-w-md text-center">
    //     <div className="grid grid-cols-3 gap-3 mb-8">
    //       {[...Array(9)].map((_, i) => (
    //         <div
    //           key={i}
    //           className={`aw-16 aspect-square rounded-2xl bg-slate-800 ${
    //             i % 2 === 0 ? "animate-pulse" : ""
    //           }`}
    //         />
    //       ))}
    //     </div>
    //     <h2 className="text-2xl font-bold mb-4">{title}</h2>
    //     <p className="text-base-content/60">{subtitle}</p>
    //   </div>
    // </div>

    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Robo Png Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative animate-bounce-slow">
            <div className="w-70 h-70 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden">
              <img
                src="robo.png"
                alt="Robot"
                className="h-60 w-60 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-base-content/60">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
