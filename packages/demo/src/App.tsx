import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Collections from './components/Collections'

function App() {
  return (
    <>
      <div className="card">
        <Collections />
      </div>
      <div className="logos-bar flex space-x-4 items-center">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React" />
        </a>
        <a href="https://element.market" target="_blank">
          <img
            src="https://static.element.bid/resource/images/favicon-180.png"
            className="logo element"
            alt="Element"
          />
        </a>
      </div>
    </>
  )
}

export default App
