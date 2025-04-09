import logo from './logo.svg';
import './App.css';
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import Home from './components/main/Home';
import { Fragment } from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import MovieList from "./components/movie/MovieList";
import MovieDetail from "./components/movie/MovieDetail";
import BoardList from "./components/board/BoardList";
import BoardInsert from "./components/board/BoardInsert";
import BoardDetail from "./components/board/BoardDetail";
import BoardUpdate from "./components/board/BoardUpdate";
import BoardDelete from "./components/board/BoardDelete";
import StoreList from "./components/MovieStore/StoreList";
import StoreDetail from "./components/MovieStore/StoreDetail";
import MovieFind from "./components/movie/MovieFind";
import NewsFind from "./components/news/NewsFind";



// Router => DispatcherServlet
function App() {
  return (
      <Fragment>
        <Router>
          <Header/>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/movie/list" element={<MovieList/>}></Route>
            <Route exact path="/movie/find" element={<MovieFind/>}></Route>
            <Route exact path="/movie/detail/:mno" element={<MovieDetail/>}></Route>
            <Route exact path="/store/list" element={<StoreList/>}></Route>
            <Route exact path="/store/detail/:mgno" element={<StoreDetail/>}></Route>
            <Route path={"/board/list"} element={<BoardList/>} />
            <Route path={"/board/insert/"} element={<BoardInsert/>} />
            <Route path={"/board/detail/:id"} element={<BoardDetail/>} />
            <Route path={"/board/update/:id"} element={<BoardUpdate/>} />
            <Route path={"/board/delete/:id"} element={<BoardDelete/>} />
            <Route path={"/news/list/"} element={<NewsFind/>} />
          </Routes>
          <Footer/>
        </Router>
      </Fragment>
  );
}

export default App;
