function getAdminAuthMessage({
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
                </style>
            </head>
            <body>
                <h1>${type === "sign" ? "Доступ к админ панели healera.ru" : "Новый пароль"} </h1>
                <div class="container">
                    <p><strong>Логин:</strong> <span>${email}</span></p>
                    <p><strong>${type === "signup" ? "Пароль:": "Новый пароль:"}</strong> <span>${generatedPassword}</span></p>
                </div>
            </body>
        </html>
    `
}

export default getAdminAuthMessage