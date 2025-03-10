const bookModel = require('../models/bookModel');


module.exports = {
    createBook: async (req, res) => {
        // console.log("response: ", res);
        try {
            const { title, author, category, price, stock, language, publishedOn } = req.body;

            //console.log(req.body);
            if (title && author && category && price && stock && language && publishedOn) {
                const newBook = new bookModel({
                    title, author, category, price, stock, language, publishedOn
                });
                const response = await newBook.save();
                //console.log("Bookstore created :", response);
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: "bookstore created successfully..........",
                    data: response
                })

            } else {
                //console.log("Missing field in request body");
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: "all fields are required"
                })
            }
        } catch (error) {
            //console.log('Error in create bookstore:', error);
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "internal server error",
                data: error.message
            })
        }
    },
    getAllBook: async (req, res) => {
        try {
            const books = await bookModel.find({ isDeleted: false });
            console.log(books);

            return res.status(200).json({
                success: true,
                statusCode: 200,
                count: books.length,
                message: "Retrieve all books:",
                data: books
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: " Internal server error",
                data: error.message
            });
        }
    },
    insertMultipleBooks: async (req, res) => {
        try {
            const { title, author, category, price, stock, language, publishedOn } = req.body;
            //console.log(req.body);
            if (req.body) {
                //console.log("hi");

                const response = await bookModel.insertMany(req.body);
                console.log("Bookstore created :", response);
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: "bookstore created successfully..........",
                    data: response
                })

            } else {
                //console.log("Missing field in request body");
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: "all fields are required"
                })
            }
        } catch (error) {
            console.log(" Error in insert multiple books: ", error);

            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: " internal server error in multiple books added",
                data: error
            })
        }
    },
    getBooksByAuthor: async (req, res) => {
        try {
            const authorName = req.body.author;
            //console.log("hi");
            console.log(authorName);
            const books = await bookModel.find({ author: authorName });
            //console.log(books);

            return res.status(200).json({
                success: true,
                statusCode: 200,
                count: books.length,
                message: "Retrieve all books:",
                data: books
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: " Internal server error",
                data: error.message
            });
        }
    },
    updateBook: (req, res) =>{
       // console.log(1);
        try {
            const { bookId, updatedData } = req.body;
            //console.log(req.body);
            if (bookId) {
                //console.log("hi");
                bookModel.updateOne(
                    { _id: bookId },
                    updatedData
                ).then((response) => {
                    console.log("response:", response);

                    return res.status(200).json({
                        success: true,
                        statusCode: 200,
                        message: "Books detailes updated"
                    })
                }).catch((error) => {
                    console.log("error is:", error);
                    return res.status(400).json({
                        success: false,
                        statusCode: 400,
                        message: "Books updation failed!",
                        data: error.message
                    });
                })
            } else {
                return res.status(404).json({
                    success: false,
                    statusCode: 404,
                    message: "missing required fields"
                });

            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "retrieve data not possible",
                data: error.message
            });

        }

    }, 
    updateByPriceAndStock: ( req, res) =>{
        try {
            console.log(req.body);
            const bookingId = req.body.bookId;
            console.log(bookingId);
            const bookprice = req.body.price;
            //console.log(bookprice);
            const bookstock = req.body.stock;
            //console.log(bookstock);
            if (bookingId) {
                bookModel.findByIdAndUpdate(
                    { _id: bookingId },
                    { price: bookprice },
                    { stock: bookstock }
                
                ).then((response) => {
                    console.log("response:", response);

                    return res.status(200).json({
                        success: true,
                        statusCode: 200,
                        message: "Books detailes updated"
                    })
                }).catch((error) => {
                    console.log("error is:", error);
                    return res.status(400).json({
                        success: false,
                        statusCode: 400,
                        message: "Books updation failed!",
                        data: error.message
                    });
                })
            } else {
                return res.status(404).json({
                    success: false,
                    statusCode: 404,
                    message: "missing required fields"
                });

            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "retrieve data not possible",
                data: error.message
            });

        }

    }
}