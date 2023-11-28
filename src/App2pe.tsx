import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [file, setFile] = useState<any>(null);

  const serverPath = "http://localhost:4000/";

  const handleSubmit = async () => {
    const data = await fetch(serverPath + "api/login", {
      method: "POST",
      body: JSON.stringify({
        perro: "sdsds",
        spsdsd: "wsdlps",
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });
    const info = await data.json();
    console.log("res", info);
    // socket.emit("login", { pepepe: "psssds" }, (res: any) => {
    //   console.log(res);
    // });
  };

  const handleSubmit2 = async (ev: any) => {
    ev.preventDefault();
    const formData = new FormData();
    console.log(typeof file);
    formData.set("file", file);
    const data = await fetch(serverPath + "api/user-photo", {
      method: "POST",
      body: formData,
    });
    const info = await data.json();
    console.log("res", info);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={handleSubmit}>Perrrrooo</button>
        <form onSubmit={handleSubmit2}>
          <input
            type="file"
            name="archivo"
            onChange={(ev) => {
              if (ev.target.files) {
                console.log(ev?.target?.files[0]);
                setFile(ev?.target?.files[0] || null);
              }
            }}
          />
          <button type="submit">Subir imagen</button>
        </form>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
