const { Model } = require("mongoose");
/**
 * 
 * @param {Model} Blog 
 */

module.exports = (Blog) => {

    const getAll = ({ page, projection } = {}) => {
        return new Promise((resolve, reject) => {
            let Query = Blog.find({}).lean();
            Query = page ? Query.skip(page).limit(DOCUMENTS_PER_PAGE) : Query;
            Query = projection ? Query.select(projection) : Query.select("-__v");
            Query.exec()
                .then(docs => {
                    return resolve({
                        status: true,
                        message: docs
                    });
                })
                .catch(err => {
                    return reject({
                        status: false,
                        message: "Query find error."
                    });
                });
        })
    }

    const getByAuthor = (author) => {
        return new Promise((resolve, reject) => {
            Blog.find({})
                .where({ author })
                .select("-__v")
                .exec()
                .then(docs => {
                    if (!docs.length)
                        return reject({
                            status: false,
                            message: "Author not found"
                        });
                    return resolve({
                        status: true,
                        message: docs
                    });
                })
                .catch(err => {
                    return reject({
                        status: false,
                        message: "An error has occured."
                    });
                });
        });
    }

    const create = (data) => {
        return new Promise((resolve, reject) => {
            Blog.create(data).then(doc => {
                resolve({
                    status: true,
                    message: "Document saved"
                });
            }).catch((err) => {
                reject({
                    status: false,
                    message: "An error has occured."
                });
            })
        });
    }

    const update = (id, data) => {
        return new Promise((resolve, reject) => {
            Blog.findOne({ _id: id }).then(doc => {
                if (!doc)
                    return reject({
                        status: false,
                        message: "Document not found."
                    });
                doc.set(data);
                doc.save().then(doc => {
                    return resolve({
                        status: true,
                        message: { ...data }
                    });
                }).catch(err => {
                    return reject({
                        status: false,
                        message: "Unable to save the document"
                    });
                })

            }).catch(err => {
                return reject({
                    status: false,
                    message: "An error has occured."
                });
            })
        });
    }

    const deleteById = (id) => {
        return new Promise((resolve, reject) => {
            Blog.findByIdAndDelete(id).then(doc => {
                if (!doc)
                    return reject({
                        status: false,
                        message: "Document not found"
                    });
                return resolve({
                    status: true,
                    message: "Document deleted"
                });
            }).catch(err => {
                return reject({
                    status: false,
                    message: "Document not found"
                });
            });
        });
    }

    return {
        getAll,
        getByAuthor,
        deleteById,
        create,
        update
    }

}