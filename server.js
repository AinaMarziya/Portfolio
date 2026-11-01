const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const Project = require("./models/Project");
const Contact = require("./models/Contact");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));


mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {

        console.log("MongoDB connected successfully");

        console.log("Database:", mongoose.connection.name);

        console.log(
            "Projects collection:",
            await Project.countDocuments()
        );

        // Start server only after MongoDB connects
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    })
    .catch((error) => {

        console.error("MongoDB connection error:", error);

        process.exit(1);

    });


app.get("/api/projects", async (req, res) => {

    try {

        const projects = await Project.find();

        res.json(projects);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error getting projects"
        });

    }

});
