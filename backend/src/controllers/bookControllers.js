const pool = require('../db/index')

const getAllBooks = async(req,res) => {
    try { 
        const result = await pool.query('SELECT * FROM books');
        res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

const postBooks = async(req,res) => {
    try{

        const {title,author} = req.body;

        if(!title || !author){
            return res.status(400).json({
                success: false,
                message: 'title and author are required'
            })
        }

        const queryText = 'INSERT INTO books(title,author) VALUES($1,$2) RETURNING *';
        const values = [title,author];

        const result = await pool.query(queryText,values);

        res.status(201).json({
            success:true,
            message:'book added successfully',
            data: result.rows[0]
        })

    }catch(error){
        res.status(500).json({
            success:false,
            error:'internal server error'
        })
    }
}

const getBookById = async(req,res) => {
    try {
        const {id} = req.params;

        const queryText = 'SELECT * FROM books WHERE id = $1';
        const result = await pool.query(queryText,[id]);

        if(result.rows.length === 0){
            return res.status(404).json({
                success:false,
                message:'book not found'
            })
        }

        res.status(200).json({
            success:true,
            data:result.rows[0]
        })

    } catch (error) {
         res.status(500).json({
            success:false,
            error:'internal server error'
        })
    }
}

const deleteBook = async(req,res) => {
    try {
    const {id} = req.params;

    const queryText = 'DELETE FROM books WHERE id = $1';
    const result = await pool.query(queryText,[id]);

    if(result.rowCount === 0){
        return res.status(404).json({
            success:false,
            message: 'book not found'
        })
    }

    //book is found
    res.status(200).json({
        success:true,
        message:'book deleted successfully'
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'internal server error'
        })
    }
}

const updateBook = async(req,res) => {
    try {
        const {title,author} = req.body;
        const {id} = req.params;

        if(!title || !author){
            return res.status(400).json({
                success:false,
                message:'title and author are required'
            })
        }

        const queryText = 'UPDATE books SET title=$1, author=$2 WHERE id = $3 RETURNING *'
        const result = await pool.query(queryText,[title,author,id]);

        if(result.rowCount === 0){
            return res.status(404).json({
                success:false,
                message:'book not found'
            })
        }

        res.status(200).json({
            success:true,
            data: result.rows[0]
        })
    } catch (error) {
        res.status(404).json({
            success:false,
            message:'internal server error'

        })
    }
}



module.exports = {getAllBooks, postBooks, getBookById, deleteBook,updateBook};