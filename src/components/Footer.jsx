import React from "react";
import "../components/styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
    <div className="block">
      <div className="flex">
        <ul>
          <li>
            <a href="https://kpfu.ru">Сайт КФУ</a>
          </li>
          <li>
            <a href="https://github.com/2211176/website">ГитХаб Проекта</a>
          </li>

          <li>
            <a href="https://react.dev">Рекомендая литература</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="https://vk.com/izheleznov2000">Оставить отзыв</a>
          </li>
          <li>
            <a href="">Форум</a>
          </li>
          <li>
            <a href="https://www.consultant.ru/document/cons_doc_LAW_305/">Защита прав потребителей</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="https://github.com/2211176/website/blob/main/README.md">О проекте</a>
          </li>

          <li>
            <a href="https://students.kpfu.ru/work/vacancies-rus">Вакансии</a>
          </li>

          <li>
            <a href="https://vk.com/s/v1/doc/CUFQUPPBZe0eQVG_8GenVsfCDszb49RaJJePLQ3Aou3_mI2qzOQ">Партнерская программа</a>
          </li>
        </ul>
      </div>
    </div>
    </footer>
  );
};

export default Footer;