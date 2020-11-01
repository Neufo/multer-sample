import express from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: (req, file, callBack) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        callBack(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});

var upload = multer({ dest: "uploads/", storage: storage });
const app = express();

app.use(express.static("public"));

app.post("/icons", upload.single("icon"), function (req, res, next) {
    res.status(200).send();
});


app.listen(3000, "localhost", () => {
    console.log("server start.");
});
