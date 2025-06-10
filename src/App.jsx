import Hyperspeed from './Backgrounds/Hyperspeed/Hyperspeed';
function App() {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Hyperspeed />

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textShadow: '0 0 10px rgba(0,0,0,0.7)',
        zIndex: 1
      }}>
        <h1>Welcome to My Portfolio</h1>
        <p>Hi, I'm [Your Name], a Web Developer</p>
      </div>
    </div>
  );
}

export default App;
