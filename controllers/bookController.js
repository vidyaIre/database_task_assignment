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
            //console.log(authorName);
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
    updateBook: (req, res) => {
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
    updateByPriceAndStock: (req, res) => {
        try {
            //console.log(req.body);
            const bookTitle = req.body.title;
            //console.log(bookingId);
            const bookprice = req.body.price;
            //console.log(bookprice);
            const bookstock = req.body.stock;
            //console.log(bookstock);
            if (bookTitle) {
                bookModel.updateOne(
                    { title: bookTitle },
                    {
                        price: bookprice,
                        stock: bookstock
                    }

                ).then((response) => {
                    //console.log("response:", response);

                    return res.status(200).json({
                        success: true,
                        statusCode: 200,
                        message: "Books detailes updated"
                    })
                }).catch((error) => {
                    //console.log("error is:", error);
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
    softDeleteBook: (req, res) => {
        try {
            const { bookId } = req.body;
            //console.log(bookId);
            if (bookId) {
                bookModel.updateOne(
                    { _id: bookId },
                    {
                        $set: {
                            isDeleted: true
                        }
                    }
                ).then((response) => {
                    if (response?.modifiedCount != 0) {
                        return res.status(200).json({
                            success: true,
                            statuscode: 200,
                            message: "Book soft-deleted successfully"
                        });
                    } else {
                        return res.status(404).json({
                            success: false,
                            statuscode: 404,
                            message: "Book soft-deletion faced a problem",
                        });
                    }

                }).catch(error => {
                    return res.status(400).json({
                        success: false,
                        statuscode: 400,
                        message: "Book soft-deletion failed!",
                        data: error
                    });
                })
            } else {
                return res.status(404).json({
                    success: false,
                    statusCode: 404,
                    message: "Book not found"
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "internal server error",
                data: error.message
            })
        }

    },
    softDeletedByTitle: (req, res) => {
        try {

            const booktitle = req.body.title;
            //console.log(title);
            if (booktitle) {
                bookModel.deleteOne(
                    { title: booktitle },
                    {
                        $set: {
                            isDeleted: true
                        }
                    }

                ).then((response) => {
                    if (response?.modifiedCount != 0) {
                        return res.status(200).json({
                            success: true,
                            statuscode: 200,
                            message: "Book soft-deleted successfully"
                        });
                    } else {
                        return res.status(404).json({
                            success: false,
                            statuscode: 404,
                            message: "Book soft-deletion faced a problem",
                        });
                    }

                }).catch(error => {
                    return res.status(400).json({
                        success: false,
                        statuscode: 400,
                        message: "Book soft-deletion failed!",
                        data: error
                    });
                })
            } else {
                return res.status(404).json({
                    success: false,
                    statusCode: 404,
                    message: "Book not found"
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "internal server error",
                data: error.message
            })
        }
    },
    getBooksByPriceRange: async (req, res) => {
        try {
            // const { min, max } = req.body;
            //console.log(min, max);
            if (min && max) {
                console.log("hi")
                const books = await bookModel.find({ price: { $gte: min, $lte: max } });

                console.log(books);
                if (books) {
                    res.status(200).json({
                        success: true,
                        statusCode: 200,
                        count: books.length,
                        message: "get books form the range between the values",
                        data: req
                    })
                } else (
                    res.status(400).json({
                        success: false,
                        statusCode: 400,
                        message: "min and max "

                    })
                )


            } else {
                res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: "min and max is not given"

                })
            }
        } catch (error) {
            //console.log("Error is :", error);
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "invalid server details",
                data: error.message
            });
        }
    },
    getTotalBooks: async (req, res) => {
        //const totalBooks = await bookModel.countDocuments();
        //console.log(totalBooks);
        try {
            const total = await bookModel.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$stock" }
                    }
                }
            ]);
            //console.log("Total:",total);
            const count = total.length > 0 ?total[0].total:0;
            if (count) {
               console.log("total books:",count);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: "get total books",
                    data:count
                   
                })
            } else (
                res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: "can not find the total books:"

                })
            )
        } catch (error) {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "invalid server details",
                data: error.message
            });
        }
    },
    getSoretedBooks: async (req, res) => {

        try {
            const books = await bookModel.find().sort({ price: 1 });
            //console.log(books);
           
            return res.status(200).json({
                success: true,
                statusCode: 200,
                count: books.length,
                message: "Retrieve all books:",
                data: books
            });
        } catch (error) {
            //console.log("Error is :", error);
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "invalid server details",
                data: error.message
            });
        }

    }
}