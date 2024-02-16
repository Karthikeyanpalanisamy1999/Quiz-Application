import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Quiz from './Quiz';
import Scorelist from './Scorelist';
import Addquestions from './Addquestions';
function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<Login/>}></Route>  
                  <Route path='/signup' element={<Signup/>}></Route>
                  <Route path='/quiz' element={<Quiz/>}></Route>
                  <Route path='/scorelist' element={<Scorelist/>}></Route>
                  <Route path='/addquestion' element={<Addquestions/>}></Route>
              </Routes>  
          </BrowserRouter>
      </div>
  );
}

export default App;
