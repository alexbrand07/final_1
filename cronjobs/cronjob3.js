const { PrismaClient } = require('@prisma/client');
const cron = require("node-cron");
const fs = require('fs');
const nodemailer = require("nodemailer");

async function saveTableAsCSV() {
  // Connect to the database using Prisma
  const prisma = new PrismaClient();

  // Query to retrieve data from the table
  const query = prisma.HistoryProduct.findMany();

  // Execute the query
  const data = await query;

  // CSV header
  let header = '';
  for (const key in data[0]) {
    header += `${key},`;
  }
  header = header.slice(0, -1) + '\n';

  // CSV body
  let body = '';
  data.forEach(row => {
    let rowData = '';
    for (const key in row) {
      rowData += `${row[key]},`;
    }
    body += rowData.slice(0, -1) + '\n';
  });

  // Write the CSV file
  fs.writeFile('history.csv', header + body, 'utf8', err => {
    if (err) {
      console.error(err);
    } else {
      console.log('Table saved as CSV file.');
    }
  });
  // Disconnect from the database
}
async function sendCSVViaEmail() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'oleksii.khorishko@gmail.com',
            pass: 'drlonzvwayfpakxl',
        },
    });
  
    transporter.sendMail({
        from: '"alexey" <oleksii.khorishko@gmail.com>', // sender address
        to: "oleksii.khorishko@gmail.com",  // list of receivers
        subject: "ok ok ok test test", // Subject line
        text: "test test test", // plain text body
        attachments: [
        {
            filename: 'history.csv',
            path: './history.csv'
        }
        ]
    }).then(info => {
        console.log({info});
    }).catch(console.error);
}

cron.schedule("0 9 1,15 * *", function(){
    saveTableAsCSV();
    sendCSVViaEmail();
});


// async function sendCSVViaEmail() {
//   // Create the transport for sending email
//   let transporter = nodemailer.createTransport({
//     // host: 'smtp.gmail.com',
//     service: 'gmail.com',
//     // secure: false,
//     auth: {
//       user: 'oleksii.khorishko@gmail.com',
//       pass: 'Vivi201219',
//     },
//   });
//   transporter.verify().then(console.log).catch(console.error)

//   // Send the email with the CSV file as an attachment
//   let info = await transporter.sendMail({
//     from: '"Alexey" <oleksii.khorishko@gmail.com>',
//     to: 'oleksii.khorishko@gmail.com',
//     subject: 'Table Data as CSV',
//     text: 'Attached is the table data as a CSV file.',
//     attachments: [
//       {
//         filename: 'logs.csv',
//         path: './logs.csv'
//       }
//     ]
//   });

//   console.log('Email sent: ', info.messageId);
// }
