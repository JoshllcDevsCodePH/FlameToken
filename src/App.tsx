import React, { useEffect, useState } from 'react';
import './index.css';
import Arrow from './icons/Arrow';
import { bear, coin, highVoltage, notcoin, rocket, trophy } from './images';

const BoostsLayout = ({ onBack, points, setPoints }: { onBack: () => void, points: number, setPoints: (points: number) => void }) => {
  const [tapLevel, setTapLevel] = useState(1);
  const [energyLevel, setEnergyLevel] = useState(1);

  const tapUpgradeCost = 4000 * tapLevel; // Cost for upgrading Tap
  const energyUpgradeCost = 20 * energyLevel; // Example cost formula, adjust as needed

  const handleUpgradeTap = () => {
    if (points < tapUpgradeCost) {
      console.log(`Not enough points to upgrade Tap to level ${tapLevel + 1}`);
      return;
    }

    setPoints(points - tapUpgradeCost);
    setTapLevel(tapLevel + 1);
    console.log(`Upgraded Tap to level ${tapLevel + 1}`);
  };

  const handleUpgradeEnergy = () => {
    if (points < energyUpgradeCost) {
      console.log(`Not enough points to upgrade Energy to level ${energyLevel + 1}`);
      return;
    }

    setPoints(points - energyUpgradeCost);
    setEnergyLevel(energyLevel + 1);
    console.log(`Upgraded Energy to level ${energyLevel + 1}`);
  };

  return (
    <div className="boosts-layout bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
      <div className="flex justify-between items-center mb-8">
        <button className="bg-[#fad258] py-2 px-4 rounded-xl text-black" onClick={onBack}>
          <Arrow size={18} className="mr-2" /> Back
        </button>
        <h1 className="text-5xl font-bold">Boosts</h1>
      </div>
      <div className="mt-8">
        {/* Add your Boosts content here */}
        <p className="text-lg">This is the Boosts page. Here you can find various boosts to enhance your experience.</p>
      </div>
      <div className="mt-4 flex gap-4">
        <button className="bg-[#fad258] py-2 px-4 rounded-xl" style={{ width: '200px', height: '200px' }} onClick={handleUpgradeTap}>
          Upgrade Tap (Level {tapLevel}) - Cost: {tapUpgradeCost} points
        </button>
        <button className="bg-[#fad258] py-2 px-4 rounded-xl" style={{ width: '200px', height: '200px' }} onClick={handleUpgradeEnergy}>
          Upgrade Energy (Level {energyLevel}) - Cost: {energyUpgradeCost} points
        </button>
      </div>
    </div>
  );
};

const EarnLayout = ({ setShowEarn }: { setShowEarn: (showEarn: boolean) => void }) => {
  return (
    <div className="earn-layout bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
      <div className="flex justify-between items-center mb-8">
        <button className="bg-[#fad258] py-2 px-4 rounded-xl text-black" onClick={() => setShowEarn(false)}>
          <Arrow size={18} className="mr-2" /> Back
        </button>
        <h1 className="text-5xl font-bold">Earn</h1>
      </div>
      <div className="mt-8">
        {/* Add your Earn content here */}
        <p className="text-lg">This is the Earn page. Here you can find various ways to earn points.</p>
      </div>
      <div className="mt-4 flex gap-4">
        {/* Add your Earn buttons here */}
        <button className="bg-[#fad258] py-2 px-4 rounded-xl" style={{ width: '200px', height: '200px' }}>
          Earn Points (Example)
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [points, setPoints] = useState(0); // Initialize points to 0 for new users
  const [energy, setEnergy] = useState(2532);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const [showBoosts, setShowBoosts] = useState(false);
  const [showEarn, setShowEarn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true); // Add a flag to track if theuser is new
  const [showNewUserDialog, setShowNewUserDialog] = useState(false); // Add a flag to track if the new user dialog should be shown
  const developerUsername = 'titimoburat_01'; // Replace with the actual username of the developer

  useEffect(() => {
    if (isNewUser) {
      setShowNewUserDialog(true);
    }
  }, [isNewUser]);

  const handleNewUserDialogClose = () => {
    setShowNewUserDialog(false);
    setIsNewUser(false);
    setPoints(5000); // Reward 5000 coins to the new user
  };

  const pointsToAdd = 1;
  const energyToReduce = 1;
  const energyIncreasePerSecond = 10;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + energyIncreasePerSecond, 6500));
    }, 1000); // Restore 10 energy points every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
      {showNewUserDialog && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#fad258] rounded-xl p-4 text-center">
            <h2 className="text-2xl font-bold">Welcome!</h2>
            <p className="text-lg">You have a 5000 coins for a new users!</p>
            <button className="bg-[#fad258] py-2 px-4 rounded-xl" onClick={handleNewUserDialogClose}>
              Close
            </button>
          </div>
        </div>
      )}
      {showBoosts ? (
        <BoostsLayout onBack={() => setShowBoosts(false)} points={points} setPoints={setPoints} />
      ) : showEarn ? (
        <EarnLayout setShowEarn={setShowEarn} />
      ) : (
        <>
          {/* Top bar */}
          <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
            <div className="w-full cursor-pointer">
              <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                <a
                  href={`https://t.me/${developerUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow Developer <Arrow size={18} className="ml-0 mb-1 inline-block" />
                </a>
              </div>
            </div>
            <div className="mt-12 text-5xl font-bold flex items-center">
              <img src={coin} width={44} height={44} alt="Coin" />
              <span className="ml-2">{points.toLocaleString()}</span>
            </div>
            <div className="text-base mt-2 flex items-center">
              <img src={trophy} width={24} height={24} alt="Trophy" />
              <span className="ml-1">Gold <Arrow size={18} className="ml-0 mb-1 inline-block" /></span>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10 flex flex-col md:flex-row justify-between gap-2 bottom-bar">
            <div className="w-full md:w-1/3 flex items-center justify-start max-w-32">
              <div className="flex items-center justify-center">
                <img src={highVoltage} width={44} height={44} alt="High Voltage" />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">{energy}</span>
                  <span className="text-white text-large opacity-75">/ 6500</span>
                </div>
              </div>
            </div>
            <div className="flex-grow flex items-center max-w-60 text-sm">
              <div className="w-full bg-[#eec203] py-4 rounded-2xl flex justify-around">
                <button className="flex flex-col items-center gap-1">
                  <img src={bear} width={24} height={24} alt="Bear" />
                  <span>Frens</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1" onClick={() => setShowEarn(true)}>
                  <img src={coin} width={24} height={24} alt="Coin" />
                  <span>Earn</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1" onClick={() => setShowBoosts(true)}>
                  <img src={rocket} width={24} height={24} alt="Rocket" />
                  <span>Boosts</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-grow flex items-center justify-center">
            <div className="relative mt-4" onClick={handleClick}>
              <img src={notcoin} width={256} height={256} alt="Notcoin" />
              {clicks.map((click) => (
                <div
                  key={click.id}
                  className="absolute text-5xl font-bold opacity-0"
                  style={{
                    top: `${click.y - 42}px`,
                    left: `${click.x - 28}px`,
                    animation: `float 1s ease-out`
                  }}
                  onAnimationEnd={() => handleAnimationEnd(click.id)}
                >
                  {pointsToAdd}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <style>
        {
          `
            @media only screen and (max-width: 768px) {
             .boosts-layout,.earn-layout {
                padding: 16px;
              }
             .boosts-layout button,.earn-layout button {
                width: 100;
                height: 100px;
                font-size: 16px;
              }
             .bottom-bar {
                margin-bottom: 12px;
                flex-direction: column;
                align-items: center;
                text-align: center;
                justify-content: center;
                width: 100vw;
                left: 0;
                right: 0;
                padding: 0 16px;
              }
             .bottom-bar button {
                width: 70px;
                height: 40px;
                font-size: 12px;
              }
             .main-content {
                flex-direction: column;
                align-items: center;
              }
             .main-content img {
                width: 128px;
                height: 128px;
              }
            }
          `
        }
      </style>
    </div>
  );
};

export default App;
