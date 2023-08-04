import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./Pages/Login/LoginForm";
import DetailsForm from "./Pages/DetailsForm/DetailsForm";
import UploadForm from "./Pages/UploadForm/UploadForm";
import SubmitPage from "./Pages/Submit/SubmitPage";
import BiddersPage from "./Pages/BiddersPage/BiddersPage";
import CMCPage from "./Pages/Submit/CmcPage";
import CIVILPage from "./Pages/Submit/CivilPage";

function App() {
  const [user, setUser] = useState(12);
  const [formValue, setFormValue] = useState({});
  const [token, setToken] = useState("");
  const [index, setIndex] = useState(2);
  const [id, setID] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <LoginForm
                user={user}
                setUser={setUser}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route
            exact
            path="/bidders"
            element={
              user ? (
                <BiddersPage
                  user={user}
                  setUser={setUser}
                  token={token}
                  setToken={setToken}
                  id={index}
                  setIndex={setIndex}
                />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            exact
            path="/details"
            element={
              user ? (
                <DetailsForm
                  user={user}
                  setUser={setUser}
                  formValue={formValue}
                  setFormValue={setFormValue}
                  id ={id}
                  setID= {setID}
                />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            exact
            path="/upload"
            element={
              user ? (
                <UploadForm
                  user={user}
                  token={token}
                  setUser={setUser}
                  formValue={formValue}
                  id ={id}
                  setID= {setID}
                />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            exact
            path="/success"
            element={
              user ? (
                <SubmitPage
                  user={user}
                  setUser={setUser}
                  formValue={formValue}
                  setFormValue={setFormValue}
                />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            exact
            path="/cmc"
            element={
              user ? (
                <CMCPage
                  user={user}
                  setUser={setUser}
                  formValue={formValue}
                  setFormValue={setFormValue}
                  id={index}
                  setIndex={setIndex}
                />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            exact
            path="/civil"
            element={
              user ? (
                <CIVILPage
                  user={user}
                  setUser={setUser}
                  formValue={formValue}
                  setFormValue={setFormValue}
                  id={index}
                  setIndex={setIndex}
                />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route exact path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
