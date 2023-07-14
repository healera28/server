import moment from 'moment'

function adminCodeMessage(code) {
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
                
                .code {
                    font-weight: bold;
                    font-size: 36px;
                }
                </style>
            </head>
            <body>
                <h1>Код потдверждения healera.ru</h1>
                <div class="container">
                    <h2 class="code">${code}</h2>
                </div>
                <h3>Код действителен в течении 5 минут</h3>
            </body>
        </html>
    `
}

export default adminCodeMessage