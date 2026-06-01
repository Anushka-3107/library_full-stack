const pool = require('../db/index');

const getAllStudents = async(req,res) => {
    try {
        const result = await pool.query('SELECT * FROM students')
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

const postNewStudent = async(req,res) => {
    try {
        const {name,batch} = req.body;

    if(!name || !batch){
        return res.status(400).json({
            success:false,
            message:'name and batch are required'
        })
    }

    const queryText = 'INSERT INTO students(name,batch) VALUES($1,$2) RETURNING *';

    const result = await pool.query(queryText,[name,batch]);

    res.status(201).json({
        success:true,
        message: 'student added successfully',
        data: result.rows[0]
    })
    } catch (error) {
     res.status(500).json({
        error:'internal server error'
     })   
    } 
}

const getStudentsById = async(req,res) => {
    try {
        const {id} = req.params;

        const queryText = 'SELECT * FROM students WHERE id = $1';
        const result = await pool.query(queryText, [id]);

        if(result.rowCount === 0){
            return res.status(404).json({
                success:false,
                message:'student not found'
            })
        }

        res.status(200).json({
            success:true,
            data:result.rows[0]
        })

    } catch (error) {
        res.status(500).json({
            error: 'internal server error'
        })
    }
}


const deleteStudent = async(req,res) => {
    try {
        const {id} = req.params;

        const queryDel = 'DELETE FROM students WHERE id = $1';
        const result = await pool.query(queryDel,[id]);

        if(result.rowCount === 0){
            return res.status(401).json({
                success:false,
                message:'student not found'
            })
        }


        res.status(200).json({
            success:true,
            message:'student record deleted'
        })

    } catch (error) {
        res.status(500).json({
            error:'internal server error'
        })
    }
}

const updateStudent = async(req,res) => {
    try {
        const {name,batch} = req.body;
        const {id} = req.params;

        if(!name || !batch){
            return res.status(400).json({
                success:false,
                message:"name and batch is required"
            })
        }

        const queryUpdate = 'UPDATE students SET name=$1, batch=$2 WHERE id=$3';
        const result = await pool.query(queryUpdate,[name,batch,id]);

          if(result.rowCount === 0){
            return res.status(404).json({
                success:false,
                message:'student not found'
            })
        }

        res.status(200).json({
            success:true,
            data:result.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            error:'internal server error'
        })
        
    }
}


module.exports = {getAllStudents,postNewStudent,getStudentsById,deleteStudent, updateStudent};