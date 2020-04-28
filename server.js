// const express = require('express');

// const mailgunLoader = require('mailgun-js');
// const app = express();
// app.use(express.json());
// app.get('/api/customers', (req, res) => {
//   const customers = [
//     {id: 1, firstName: 'John', lastName: 'Doe'},
//     {id: 2, firstName: 'Brad', lastName: 'Traversy'},
//     {id: 3, firstName: 'Mary', lastName: 'Swanson'},
//   ];

//   res.json(customers);
// });

// let mailgun = mailgunLoader({
//   apiKey: 'c63d4b5eaf1adc1477c299717ae36f83-f135b0f1-547bd9aa',
//   domain: 'sandboxd59c83d522c143e38cc948a1fd0ac0a9.mailgun.org'
// });

// const sendEmail = (to, from, subject, content) =>{
//   let data = {
//       to,
//       from,
//       subject,
//       text: content
//   };
//   return mailgun.messages().send(data);
// };

// app.post('/api/contact', async (req, res, next) => {
//   try{
//       await sendEmail('andrej_sk_94@yahoo.com', req.body.email, 'Kontakt-test', req.body.message);
//   }catch(e){
//       console.log(e);
//       res.status(500);
//   }   
// });

// const port = 5000;

// app.listen(port, () => `Server running on port ${port}`);
const express = require ('express')
const bodyParser = require ('body-parser')
const nodemailer = require ('nodemailer')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/form', (req, res) => {
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
        <h3>Detalne informacije</h3>
        <ul>
            <li>Name ${req.body.name}</li>
            <li>Email ${req.body.email}</li>
        </ul>
        <h3>Poruka</h3>
        <p>${req.body.message}</p>
        `

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'andrej.la24@gmail.com',
                pass: 'Seranda123456!'
            },
            tls:{
                rejectUnauthorized: false,
            }
        })

        let mailOptions = {
            from: req.body.email,
            to: 'andrej.la24@gmail.com',
            subject: 'Nova poruka E-Home' ,
            text: req.body.message,
            html: htmlEmail
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err)
            }

            console.log('Message sent')
            
        })

    })
})


app.post('/api/email', (req, res) => {
  nodemailer.createTestAccount((err, account) => {
      const htmlEmail = `
      <h3>Detalne informacije</h3>
      <ul>
          <li>Email ${req.body.email}</li>
      </ul>
      <h3>Message</h3>
      <p>Prijavujem se na vash newslater</p>
      `

      let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
              user: 'andrej.la24@gmail.com',
              pass: 'Seranda123456!'
          },
          tls:{
              rejectUnauthorized: false,
          }
      })

      let mailOptions = {
          from: req.body.email,
          to: 'andrej.la24@gmail.com',
          subject: 'Newsleter prijavljivanje' ,
          text: req.body.message,
          html: htmlEmail
      }

      transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
              return console.log(err)
          }
          console.log('Message sent')
      })

  })
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})