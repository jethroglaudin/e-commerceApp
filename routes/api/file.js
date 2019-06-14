const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOveride = require('method-override');
const crypto = require("crypto");

// set up connection to db for file storage

const storage = require('multer-gridfs-storage') ({
    db: connection.db
})