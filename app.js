const express = require('express')
const bcrypt = require('bcrypt');
const app = express()
const port = 3000
const path = require("path");
var cookieParser = require('cookie-parser')
app.set('views', './views');
app.set('view engine', 'ejs');

const basicAuth = require('express-basic-auth')

app.use(basicAuth({
  //users: { [process.env.ADMIN_USERNAME]: process.env.ADMIN_PASSWORD },
  authorizer: authorizer,

  authorizeAsync: true,
  challenge: true
}));




async function authorizer(username, password, cb) {
  const rowSeparator = "\r\n";
  const cellSeparator = ";";
  fs.readFile(
    "users.csv",
    "utf8",
    (err, data) => {
      const rows = data.split(rowSeparator);
      const [headerRow, ...contentRows] = rows;
      const header = headerRow.split(cellSeparator);
      const admins = contentRows.map(row => {
        const cells = row.split(cellSeparator);
        const admin = {
          username: cells[0],
          password: cells[1]
        };

        return admin;
      });
      
      for (const admin of admins) {
       
        if (basicAuth.safeCompare(username, admin.username) & bcrypt.compare(password, admin.password))
          console.log("accept");
        return cb(null, true)

      }
      console.log("refus");
      return cb(null, false)
    });

}




app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"))
})


app.get('/students', (req, res) => {
  const rowSeparator = "\n";
  const cellSeparator = ";";
  fs.readFile(
    "data.csv",
    "utf8",
    (err, data) => {
      const rows = data.split(rowSeparator);
      const [headerRow, ...contentRows] = rows;
      const header = headerRow.split(cellSeparator);
      const students = contentRows.map(row => {
        const cells = row.split(cellSeparator);
        const student = {
          name: cells[0],
          school: cells[1]
        };
        return student;
      });
      res.render("students", { students: students });
    });
});


app.get('/students/create', (req, res) => {
  res.render("create-student")
})

app.use(express.urlencoded({ extended: true }));
app.post('/students/create', (req, res) => {
  console.log(req.body);
  const csvLine = `\r\n${req.body.name};${req.body.school}`
  console.log('csvLine', csvLine);
  const stream = fs.writeFile('data.csv', csvLine, { flag: "a" }, (err) => {
    res.redirect("/students/create?created=1");
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const fs = require("fs")
app.get('/api/students-csv', (req, res) => {
  fs.readFile('data.csv', 'utf8', (err, data) => {
    if (err) {
      console.error('Une erreur s\'est produite lors de la lecture du fichier :', err);
      return;
    }
    res.send(data)
  });
})


app.get('/api/students-csv-parsed', (req, res) => {
  const rowSeparator = "\n";
  const cellSeparator = ";";
  fs.readFile(
    "data.csv",
    "utf8",
    (err, data) => {
      const rows = data.split(rowSeparator);
      const [headerRow, ...contentRows] = rows;
      const header = headerRow.split(cellSeparator);
      const students = contentRows.map(row => {
        const cells = row.split(cellSeparator);
        const student = {
          name: cells[0],
          school: cells[1]
        };
        return student;
      });
      console.log(students);
    });
});


var cookieParser = require('cookie-parser')
app.use(cookieParser())


app.post('/api/login', (req, res) => {
  console.log("aaa");
  console.log("req.cookies",req.cookies);
  const token = "FOOBAR";
  const tokenCookie = {
    path: "/"
    ,
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 1000),
  };
  console.log("tokenCookie",tokenCookie);
  res.cookie("auth-token"
  , token, tokenCookie);
})

app.use(express.json())
app.post('/api/students/create', (req, res) => {
  console.log("req.body",req.body)
  const csvLine = `\r\n${req.body.name};${req.body.school}`
  console.log('csvLine', csvLine);
  const stream = fs.writeFile('data.csv', csvLine, { flag: "a" }, (err) => {
    res.send('ok');
  })
})
app.use(express.urlencoded({ extended: false }))
app.post('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log("id", id);

  const rowSeparator = "\n";
  const cellSeparator = ";";

  fs.readFile("data.csv", "utf8", (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier CSV:', err);
      return res.status(500).send('Erreur interne du serveur');
    }

    const rows = data.split(rowSeparator);

    // Vérifiez si l'ID est valide
    if (id < 0 || id >= rows.length - 1) { // -1 pour l'en-tête
      return res.status(404).send('Étudiant non trouvé');
    }

    // Modifier la ligne correspondante
    const [headerRow, ...contentRows] = rows;
    const cells = contentRows[id].split(cellSeparator);
    cells[0] = req.body.name;
    cells[1] = req.body.school;
    contentRows.splice(id, 1, cells.join(cellSeparator));
    const updatedCSV = [headerRow].concat(contentRows).join(rowSeparator);
    fs.writeFile("data.csv", updatedCSV, 'utf8', (err) => {
      if (err) {
        console.error('Erreur lors de l\'écriture du fichier CSV:', err);
        return res.status(500).send('Erreur lors de la mise à jour du fichier CSV');
      }
      res.redirect(`/students/`);
    });
  });
});

app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const rowSeparator = "\n";
  const cellSeparator = ";";
  fs.readFile(
    "data.csv",
    "utf8",
    (err, data) => {
      const rows = data.split(rowSeparator);
      const studentRow = rows[id + 1]; // +1 because row 0 is the header
      if (!studentRow) {
        res.status(404).send('Student not found');
        return;
      }
      const cells = studentRow.split(cellSeparator);
      const student = {
        id:id,
        name: cells[0],
        school: cells[1]
      };
      res.render("student_details", { student });
    });
});


