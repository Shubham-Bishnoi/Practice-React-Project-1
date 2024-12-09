import "./App.css";
import { useEffect, useState, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";

function App() {
  //scroll down
  const [messages, setMessages] = useState(["Hello!", "How are you?"]);
  const chatBoxRef = useRef(null);

  // Function to simulate adding new messages
  const addMessage = () => {
    setMessages((prevMessages) => [...prevMessages, "New message!"]);
  };

  // Scroll to the bottom whenever a new message is added
  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  // clock

  const [currentClock, setCurrentClock] = useState(1);
  const timer = useRef();

  function startClock() {
    let value = setInterval(function () {
      setCurrentClock((c) => c + 1);
    }, 1000);
    timer.current = value;
  }

  function stopClock() {
    clearInterval(timer.current);
  }

  return (
    <div>
      <div
        ref={chatBoxRef}
        style={{
          height: "200px",
          overflowY: "scroll",
          border: "1px solid black",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <button onClick={addMessage}>Add Message</button>

      <div>
        {currentClock}
        <br></br>
        <button onClick={startClock}>Start</button>
        <button onClick={stopClock}>Stop</button>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            <Route
              path="/neet/online-coaching-class-11"
              element={<Class11Program />}
            />
            <Route
              path="/neet/online-coaching-class-12"
              element={<Class12Program />}
            />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Layout() {
  return (
    <div style={{ height: "100vh", backgroundColor: "beige" }}>
      <Header></Header>
      <div style={{ height: "90vh", width: "210vh", backgroundColor: "gray" }}>
        <Outlet></Outlet>
      </div>
      FOOTER
    </div>
  );
}

function Header() {
  return (
    <div>
      <Link to="/">Allen</Link>|
      <Link to="/neet/online-coaching-class-11">Class 11</Link>|
      <Link to="/neet/online-coaching-class-12">Class 12</Link>
    </div>
  );
}

function Landing() {
  return <div>Welcome to allen</div>;
}

function ErrorPage() {
  return <div>Sorry page not find</div>;
}

function Class11Program() {
  return <div>NEET programs for Class 11th</div>;
}

function Class12Program() {
  const navigate = useNavigate();

  function redirectUser() {
    navigate("/");
  }
  return (
    <div>
      NEET programs for Class 12th
      <button onClick={redirectUser}>Go back To Landing page</button>
    </div>
  );
}

export default App;
