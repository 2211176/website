import "../styles/MainPage.css";
import { Link } from 'react-router-dom';
import Footer from "../Footer";
import ChatGPT2 from "../ChatGPT2";
import ChatGPT from "../ChatGPT";
import AI from "../FireGPT";
import RapidAI from "../RapidAI";

const MainPage = () => {
  return (
    <div>
      <div className="container">
        <h2 className="heading">Welcome to main page!</h2>
        <Link to="/taketest1" className="link">Пройти тест по языкам программирования</Link>
        <Link to="/taketest2" className="link">Пройти тест по языкам программирования2</Link>
      </div>
      <br />
      <div>
        {/* <ChatGPT /> Не работает из-за блока API в РФ( можно заплатить на https://proxyapi.ru */}
        {/* <ChatGPT2 /> Не работает из-за блока API в РФ( можно заплатить на https://proxyapi.ru */}
        {/* <AI /> Ошибка связи с сервером(( */}
        <h2 className="heading">Down here you can ask a question for ChatGPT!</h2>
        <RapidAI />
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;