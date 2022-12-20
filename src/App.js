import React from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users/Users";
import { useState } from "react";
import { useEffect } from "react";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]); // состояние в котором хранится массив всех приглашенных гостей
  const [isLoading, setIsLoading] = useState(true); // состояние в котором хранится информация о загрузке контента
  const [searchValue, setSearchValue] = useState(""); // состояние для управляемого инпута поиска
  const [success, setSuccess] = useState(false); // состояние в котором хранится информация об успешном добавлении пользователей

  useEffect(() => {
    // отправляем запрос на сервер, где хранится список пользователей
    // затем берем оттуда данные из JSON файла
    // затем преобразуем их в json
    // и передаем в функцию изменения состояния setUsers сами данные
    fetch("https://reqres.in/api/users?page=2")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err); // вывод ошибки в консоль
        alert("Ошибка!");
      })
      .finally(() => setIsLoading(false)); //при любом результате загрузки данных (при получении или ошибке) меняем состояние загрузки на false
  }, []);

  const onChangeSearchValue = (event) => {
    // функция изменения значения в поле инпута, где в параметр мы передаем событие ввода в инпут
    setSearchValue(event.target.value); // изменяем состояние, передавая в него новое значение после ввода текста в инпут
  };

  // После вызова функции при клике на плюс исполняется проверка
  // Если в массиве с пользователями есть id пользователя, то мы исключаем этого пользователя из списка приглашенных
  // В ином случае в уже созданный массив добавляется id пользователя

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSuccess(true);
  };
  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          items={users}
          isLoading={isLoading}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
