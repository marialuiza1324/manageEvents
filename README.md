# 📱 Manage Events

Aplicativo mobile desenvolvido com **React Native (Expo)** para gerenciamento de usuários, eventos e reservas.

---

## 🚀 Funcionalidades

* 👤 Cadastro de usuários
* 🔐 Login de usuário
* 📅 Listagem de eventos (via API)
* 🎟️ Reserva de eventos
* 📦 Persistência local com AsyncStorage
* 🔄 Controle de sessão com Context API

---

## 🧠 Tecnologias utilizadas

* React Native
* Expo
* React Navigation (Drawer + Stack)
* AsyncStorage
* Axios

---

## 📂 Estrutura do projeto

```
├── screens/
│   ├── login/
│   ├── users/
│   ├── reserves/
│   └── events/
│
├── services/
│   ├── userStorage.js
│   ├── eventStorage.js
│   ├── reserveStorage.js
│   ├── eventsApi.js
│   └── authContext.js
│
├── App.js
```

---

## 🔐 Autenticação

O app utiliza **Context API** para gerenciar o usuário logado globalmente:

* `AuthContext` armazena o usuário
* Login atualiza o contexto
* Telas acessam via `useContext`

---

## 💾 Persistência de dados

Os dados são armazenados localmente usando **AsyncStorage**:

* Usuários → `user:{email}`
* Eventos → `event:{id}`
* Reservas → `reserve:user:{email}`

---

## 🔄 Fluxo do sistema

1. Usuário realiza login
2. Dados são carregados do AsyncStorage
3. Eventos são buscados da API
4. Usuário pode realizar reservas
5. Reservas ficam vinculadas ao usuário

---

## ▶️ Como rodar o projeto

```bash
npm install
npx expo start
```

---

## ⚠️ Observações

* O projeto utiliza armazenamento local (não possui backend próprio)
* Os eventos são consumidos de uma API externa (MockAPI)
* O login é baseado apenas no e-mail cadastrado
