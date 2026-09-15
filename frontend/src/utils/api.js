export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._getAuthToken = options.getAuthToken;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${this._getAuthToken ? this._getAuthToken() : ""}`,
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json().then((data) => {
        return data && data.data !== undefined ? data.data : data;
      });
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  editAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._checkResponse(res));
  }
}
