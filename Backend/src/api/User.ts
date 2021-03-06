import { Router } from 'express'
import User, {addUser, IUser} from '../models/User'

const router = Router();

router.post('/register',(req,res) => {
    const newUser: IUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
    })
    addUser(newUser, (err) => {
        if(err)
            return res.status(500).json({msg: "Internal server error"})
        return res.json({msg: "User register successfully"})
    })
})

export default router