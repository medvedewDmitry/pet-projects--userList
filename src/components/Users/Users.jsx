import React from "react";
import { Skeleton } from "./Skeleton";
import { User } from "./User";

export const Users = ({
  items,
  isLoading,
  searchValue,
  onChangeSearchValue,
  invites,
  onClickInvite,
  onClickSendInvites,
}) => {
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          value={searchValue}
          onChange={onChangeSearchValue}
          type="text"
          placeholder="Найти пользователя..."
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {items
            .filter((obj) => {
              // !!!==========================================!!!
              /* Подумать над оптимизацией поиска и рассмотреть возможность переписать конкатенацию строк в другой способ записать значения с пробелом*/
              // !!!==========================================!!!

              const fullName = (
                obj.first_name +
                " " +
                obj.last_name
              ).toLowerCase(); // записываем в одну переменную значения имени и фамилии и преоразуем его в нижний регистр

              // Проверка на совпадение того, что хранится в fullName или obj.email с тем, что ввел пользователь
              // Если значения совпадают, то возвращаем правду
              if (
                // дополнительно e-mail и значение, которое ввел пользователь переводим в нижний регистр
                fullName.includes(searchValue.toLowerCase())
              ) {
                return true;
              }
            })
            .map((obj) => (
              // с помощью ...obj передаем в пропсы все свойства которые есть у объекта (так можно делать при условии, если все свойства в точности совпадают с передаваемыми пропсами)
              // по-хорошему ключ должен быть уникальным и не быть id, но пока достаточно и так
              <User
                onClickInvite={onClickInvite}
                isInvited={invites.includes(obj.id)}
                key={obj.id}
                {...obj}
              />
            ))}
        </ul>
      )}
      {invites.length > 0 && (
        <button onClick={onClickSendInvites} className="send-invite-btn">
          Отправить приглашение
        </button>
      )}
    </>
  );
};
