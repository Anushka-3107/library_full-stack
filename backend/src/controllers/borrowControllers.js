const pool = require('../db/index');

const getBookBorrowed = async(req,res) => {
    try {
        const queryText = `
        SELECT 
        borrow.id,
        borrow.borrowed_date,
        borrow.returned_date,
        borrow.due_date,
        students.name AS student_name,
        students.batch AS student_batch,
        books.title AS book_title,
        books.author AS book_author
        FROM borrow
        JOIN students ON borrow.student_id = students.id
        JOIN books ON borrow.book_id = books.id
        `
        
        const result = await pool.query(queryText);
       
        res.status(200).json({
            success:true,
            data:result.rows
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'internal server error'
        })
    }
}

const getBookBorrowedById = async(req,res) => {
    try {
        const {id} = req.params;

        const queryText = `SELECT 
        borrow.id,
        borrow.borrowed_date,
        borrow.returned_date,
        borrow.due_date,
        students.name AS student_name,
        students.batch AS student_batch,
        books.title AS book_title,
        books.author AS book_author
        FROM borrow
        JOIN students ON borrow.student_id  = students.id
        JOIN books ON borrow.book_id = books.id
        WHERE borrow.id = $1`;

        const result = await pool.query(queryText,[id]);

        if(result.rows.length === 0){
            return res.status(404).json({
                success:false,
                message:'borrowed book not found'
            })
        }

        res.status(200).json({
            success:true,
            data:result.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'internal server error'
        })
    }
}

const postBookBorrowed = async(req,res) => {
    try {
        const {student_id,book_id,due_date} = req.body;

        if(!student_id || !book_id || !due_date){
            return res.status(400).json({
                success:false,
                message:"student , book and due date are required"
            })
        }

        //validation
        const checkQuery = 'SELECT id from borrow WHERE book_id = $1 AND returned_date IS NULL';
        const checkResult = await pool.query(checkQuery,[book_id]);

        if(checkResult.rows.length > 0){
            return res.status(400).json({
                success:false,
                message:'book is already borrowed and not returned yet'
            })
        }

        const queryText = 'INSERT INTO borrow(student_id, book_id,due_date) VALUES($1,$2,$3) RETURNING *';
        const queryResult = await pool.query(queryText, [student_id,book_id,due_date]);

        res.status(201).json({
            success: true,
            data:queryResult.rows[0]
        })
    } catch (error) {
        if(error.code === '23503'){
            return res.status(400).json({
                success:false,
                message:'student or book does not exist'
            })
        }

        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const deleteBookBorrow = async(req,res) => {
    try {
        const {id} = req.params;

        const queryText = 'DELETE FROM borrow WHERE id = $1';
        const queryResult = await pool.query(queryText,[id]);

        if(queryResult.rowCount === 0){
            return res.status(404).json({
                success:false,
                message:'id not found'
            })
        }

        res.status(200).json({
            success:true,
            message:'borrow record deleted'
        })

    } catch (error) {
        res.status(500).json({
            error:'internal server error'
        })
    }
}

const returnBook = async(req,res) => {
    try {
        const {id} = req.params;

    const queryText = `UPDATE borrow SET returned_date = NOW() WHERE id = $1
    AND returned_date IS NULL 
    RETURNING *`;

    const result = await pool.query(queryText,[id]);

    if(result.rowCount === 0){
       return res.status(400).json({
                success: false,
                message: 'borrow record not found or book already returned'
            });  
    }

    res.status(200).json({
        success:true,
        message:'book returned successfully',
        data:result.rows[0]
    });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

module.exports = {getBookBorrowed,getBookBorrowedById, postBookBorrowed, deleteBookBorrow}