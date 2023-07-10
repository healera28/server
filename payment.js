import dotenv from 'dotenv'
dotenv.config()
import crypto from 'crypto'
import { response } from 'express';

const linktoform = 'https://testpage4.payform.ru';
const secret_key = process.env.PRODAMUS_SECRET_KEY;

const data = {
  customer_phone: '+73211111312', 
  customer_email: 'dubaiprinc247@gmail.com', 
  sys: "test",
  products: [
    {
      name: 'Nutritions', 
      price: '10000', 
      quantity: '1', 
    },
  ],
  do: 'link', 
  urlSuccess: 'https://public-chinchilla.super.site',
  urlNotification: 'https://testpage4.payform.ru', 
}

// Function to create the HMAC signature
function createHmac(data, secretKey) {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(JSON.stringify(data));
  return hmac.digest('hex');
}

// data.signature = createHmac(data, secret_key);


const queryString = new URLSearchParams(data).toString();
const url = `${linktoform}?${queryString}`;

console.log({url, data})

'https://testpage4.payform.ru?customer_phone=%2B73211111312&customer_email=dubaiprinc247%40gmail.com&sys=test&products=%5Bobject+Object%5D&do=link&urlSuccess=https%3A%2F%2Fpublic-chinchilla.super.site&urlNotification=https%3A%2F%2Ftestpage4.payform.ru&signature=4c2b4bee7fd4764b4aadbd7be6885b3aaabfce57ab3027324998249b0784a9f3'
'https://testpage4.payform.ru/?order_id=test&customer_phone=79998887755&products[0][price]=4000&products[0][quantity]=1&products[0][name]=Обучающие материалы&customer_extra=Полная оплата курса&do=link'

await fetch('https://testpage4.payform.ru/?order_id=test&customer_phone=79998887755&products[0][price]=4000&products[0][quantity]=1&products[0][name]=Обучающие материалы&customer_extra=Полная оплата курса&do=link', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', 
    }
})
.then(response => {
    console.log(response.json())
})
