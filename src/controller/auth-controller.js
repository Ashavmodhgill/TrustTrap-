import UserService from "../Services/user-services.js";
const userService = new UserService();

export const signUp = async (req, res) => {
    try {
        const response = await userService.signup({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name

    });

    return res.status(201).json({
        sucess: true,
        message: 'sucessfully created a new user',
        data: response,
        err: {}
    });
        
    } catch (error) {
        return res.status(500).json({
        sucess: false,
        message: 'something went wrong',
        data:{},
        err: error
    });
    }
    
}

export const login = async (req,res) => {
    try {
        const token =  await userService.singnin(req.body);
    return  res.status(200).json({
        sucess: true,
        message: 'looged in sucessfully',
        data: token,
        err: {}
    })
    } catch (error) {
        return res.status(500).json({
        sucess: false,
        message: 'something went wrong',
        data:{},
        err: error
    });
    }
}