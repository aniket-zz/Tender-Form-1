import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import {Routee} from './Routes';
import LoginForm from './Pages/Login/LoginForm';
import DetailsForm from './Pages/DetailsForm/DetailsForm'
import UploadForm from './Pages/UploadForm/UploadForm'
import SubmitPage from './Pages/Submit/SubmitPage'

function App() {
  const [user, setUser] = useState(undefined);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginForm user={user} setUser={setUser} />} />
          <Route exact path="/details" element={user ? <DetailsForm user={user} setUser={setUser} /> : <Navigate to="/" replace={true} />} />
          <Route exact path="/upload" element={user ? <UploadForm user={user} setUser={setUser} /> : <Navigate to="/" replace={true} />} />
          <Route exact path="/success" element={user ? <SubmitPage user={user} setUser={setUser} /> : <Navigate to="/" replace={true} />} />
          <Route exact path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
