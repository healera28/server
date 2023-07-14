function getAuthMessage({
    email,
    generatedPassword,
    type = "signup",
}) {

    return `
        <html>
            <head>
                <style>
                .container {
                    margin-bottom: 20px;
                    background-color: #e3e3e3;
                    padding: 12px;
                    border-radius: 5px;
                }
                
                .container h3 {
                    margin-top: 0;
                }
                
                .link {
                    display: inline-block;
                    background-color: #e3e3e3;
                    padding: 12px;
                    border-radius: 5px;
                }

                .link a {
                    font-size: 16px
                }
                </style>
            </head>
            <body>
                        <h1>Доступ к админ панели healera.ru</h1>
                        <div class="container">
                            <p><strong>Логин:</strong> <span>${email}</span></p>
                            <p><strong>${type === "signup" ? "Пароль:": "Новый пароль:"}</strong> <span>${generatedPassword}</span></p>
                        </div>

                        <h1>${type === "signup" ? "Вам дан доступ к книге рецептов Валерии Кононовой" : "Новый пароль доступа к книге рецептов Валерии Кононовой" }</h1>
                        <div class="container">
                            <p><strong>Логин:</strong> <span>${email}</span></p>
                            <p><strong>${type === "signup" ? "Пароль:": "Новый пароль:"}</strong> <span>${generatedPassword}</span></p>
                        </div>
                        <div class="link">
                            <h3>Перейдите по ссылке ниже и авторизуйтесь</h3>
                            <a href="https://book.healera.ru">book.healera.ru</a>
                        </div>
            </body>
        </html>
    `
}

export default getAuthMessage