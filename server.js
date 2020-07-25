const express = require("express")
const app = express();
const path = require("path")
const PORT =  process.env.PORT || 3000;

//url body json parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

let tableArr = [];
let waitlistArr = [];
let maxNumber = 5;


//route for index.html file 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/home.html"))
})
//route for when user clicks view table
app.get("/tables", (req, res) => res.sendFile(path.join(__dirname, "tables.html")))

//route for when user cliks make reservations
app.get("/reservation", (req, res) => res.sendFile(path.join(__dirname, "reserve.html")))

//route for when user cliks make Api table link
app.get("/api/tables", (req, res) => res.json(tableArr))

//route for when user cliks make Api waitlist link
app.get("/api/waitlist", (req, res) => res.json(waitlistArr))


//route to clear out array (waitlist and reservations)
app.post("/api/clear", (req, res) => {
    tableArr=[]
    waitlistArr=[]

    res.json({ok:true})
})

app.post("/api/tables", (req, res) => {
    var newReservation = req.body
    console.log(newReservation);
    if (tableArr.length === maxNumber) {
        waitlistArr.push(newReservation);
        console.log(`inside waitlisat array line 41 ${waitlistArr}`)
    }
    else {
        tableArr.push(newReservation);
        console.log(`inside table array line 45 ${tableArr}`)
    }
})

app.listen(PORT, function () {
    console.log(`the port is listening to ${PORT}`)
})