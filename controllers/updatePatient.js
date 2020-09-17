const db = require('../models/index');

const Patient = db.Patient;

const ErrorResponse = require('../utils/errorResponse');

exports.updatePatient = (req, res) => {
    //must set patient id as param
    if(!req.params.id){
        let ERR = new ErrorResponse('Patient id cannot be empty', 400);
        res.send(ERR)
    }
    //reject null body
    if(!req.body){
        let ERR = new ErrorResponse('Content cannot be empty', 400);
        res.send(ERR)
    }
    //get id from params
    const patientId = req.params.id;

    Patient.update(req.body, {
        where: { id: patientId}
    })
    .then(row =>{
        if(row == 1){
            res.send({
                success: true,
                message:"Patient record was updated successfully"
            });
        } else  {
            res.send({
                success: false,
                message: `Cannot update patient with id = ${patientId}`

            })
        }
    })
    .catch(err =>{
        console.log(err);
            let ERR = new ErrorResponse('Error updating patient with id='+patientId+"err:"+err.message, 500);
            res.send(ERR)
    });
    
}