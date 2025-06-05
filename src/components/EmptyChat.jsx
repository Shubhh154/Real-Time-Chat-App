import { MessageSquare } from "lucide-react";

const EmptyChat = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Robo Png Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative animate-bounce-slow">
            <div className="w-40 h-40 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden">
              <img
                src="robo.png"
                alt="Robot"
                className="h-36 w-36 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to ChatOrbit!</h2>
        <p className="text-base-content/60">
          Keep your people in orbit. Seamless chat, always within reach!
        </p>
      </div>
    </div>
  );
};

export default EmptyChat;
