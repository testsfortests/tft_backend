import DataInfo from '../model/datainfo.js';
import express from 'express';
const router = express.Router();

// done
router.get('/QI', async (req, res) => {
    const subject_name = req.body.subject;
    const sheet_name = req.body.sheet;
    const data = await DataInfo.find({ subject:subject_name,sheet : sheet_name });
    if (!data || data.length === 0) {
        return res.status(404).json({success:false,message:"'Data not found in DB"});
    }
    res.status(200).json({success:true, message: 'Data Fetched successfully', data});
});

//done
router.post('/QI', async (req, res) => {
    console.log("called post qi", req.body)
    try {
        const { subject, sheet, questionIndex } = req.body;

        // Search for the document based on subject and sheet
        let data = await DataInfo.findOne({ subject, sheet });

        if (data) {
            // If the document exists, update the questionIndex value
            if (questionIndex !== undefined) {
                data.numbers.questionIndex = questionIndex;
                
                // Add questionIndex to generatedNumbers array
                data.numbers.generatedNumbers.push(questionIndex);
            } else {
                // Increment questionIndex by 1 if not provided
                data.numbers.questionIndex += 1;
                data.numbers.generatedNumbers.push(data.numbers.questionIndex);

            }
            await data.save();
        } else {
            // If the document does not exist, create a new one and save it
            data = new DataInfo({
                subject,
                sheet,
                numbers: {
                    questionIndex: questionIndex !== undefined ? questionIndex : 0, 
                    maxValue: 1000,
                    generatedNumbers: questionIndex !== undefined ? [questionIndex] : []
                }
            });
            await data.save();
        }

        res.status(200).json({success:true, message: 'Data updated successfully', data});
    } catch (error) {
        res.status(500).json({ success: false,message: 'Data not inserted or updated to DB', error: error }); 
    }
});

//done
router.delete('/QI', async (req, res) => {
    try {
        const { subject, sheet } = req.body;

        // Find the document based on subject and sheet
        const data = await DataInfo.findOneAndDelete({ subject, sheet });

        if (!data) {
            return res.status(404).json({success:false, message: 'Data not found.' });
        }

        res.status(200).json({success :true ,message: 'Data deleted successfully', data });
    } catch (error) {
        res.status(500).json({success:false,message: 'Error deleting data from DB', error: 'Internal Server Error' });
    }
});


export default router;
