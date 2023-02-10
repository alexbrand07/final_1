const cron = require("node-cron")
const fs = require("fs")
const moment = require("moment");
const { PrismaClient } = require('@prisma/client');

async function saveTableAsCSV() {
// Connect to the database using Prisma
    const prisma = new PrismaClient();
// Query to retrieve data from the table
    const query = prisma.logs.findMany({
        include: {
            product: {
                include: {
                    name: true,
                }
            }
        },
    });
// Execute the query
    query.then(data => {
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
    fs.writeFile('logs.csv', header + body, 'utf8', err => {
        if (err) {
            console.error(err);
        } else {
            console.log('Table saved as CSV file.');
        }
    });
  // Disconnect from the database
//   prisma.disconnect();
})};

cron.schedule("53 12 * * *", function(){
    saveTableAsCSV();
});

