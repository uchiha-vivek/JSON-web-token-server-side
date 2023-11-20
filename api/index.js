const express = require('express');
const jwt = require('jsonwebtoken')
const app = express()

app.use(express.json());  // it is a middleware.



const data = [
    {
        id:1234,
        name:"vivek",
        password:"vivek",
        isAccess:true
    },
    {
        id:5678,
        name:"prit",
        password:"prit",
        isAccess:false

    }
]


app.get('/',(req,res) =>{
    res.send(`server is successfully running.`)
})

app.get('/json',(req,res) => {
    res.send(data)
    console.log(data)
})

app.post('/api/refresh', (req,res) =>{
    //  take the token which is refreshed.
    const refreshToken = req.body.tokens

    // receiving error when there is no token;

    if(!refreshToken) return res.status(401).json('You are not authenticated')
    if(!refreshTokens.includes(refreshToken)){
        return res.status(403).json('refresh token is not valid')
    }

    jwt.verify(refreshToken,"myRefreshSecretKey",(err,user)=>{
        err && console.log(err);

        refreshTokens= refreshTokens.filter
    })

    //create new access token , refresh token and send to the user if everything is ok!!

})

const generateAccessToken = (data) => {
    return jwt.sign( {id:data.id, isAccess:data.isAccess},
    'secretkey',
    {expiresIn:'15m'})
}

const  generateRefreshToken= (data) =>{
     return jwt.sign({id:data.id , isAccess:data.isAccess},
        'myRefreshSecretKey',
        {expiresIn:'15m'})
}

let refreshTokens=[] // empty array of tokens.

app.post('/api/login',(req,res) => {
    // const {name ,password} = req.body;
    // res.send(`success`)
    const {name ,password} = req.body;
    const user = data.find((params) =>{
        return params.name === name && params.password===password;
    });
    if(user){
        // res.json(user)
        //generate an access token
 
         const accessToken= generateAccessToken(user)

          const refreshToken= generateRefreshToken(user);
         refreshTokens.push(refreshToken)

        // const refreshToken = jwt.sign({id:user.id, isAccess: user.isAccess},'myRefreshSecretKey',
        // { expiresIn:"15m"}
        // )


        res.json({
            name:user.name,
            isAccess:user.isAccess,
            accessToken 
        })

    }
    else{
        res.status(400).json(`user not found`)
    }
})



// verification process.

const verify = (req,res,next) => {
    const authHeader= req.headers.authorization;
    if(authHeader){
        const tokens= authHeader.split(" ")[1]
        jwt.verify(tokens,'secretkey',(err,data) => {
            if(err){
                return res.status(403).json(`token is not valid`)
            }
            req.data=data;
            next()
             

        })

    }
    
        else{
            res.status(401).json(`you are authenticated`)
        }
    }

    app.delete('/api/users/:userId',verify,(req,res)=>{
        if(req.data.id === req.params.userId || req.data.isAccess)
        {
            res.status(200).json(`User has been deleted.`)
        }
        else{
            res.status(403).json("Ypu are not allowed to delete")
        }
    })
 


app.listen(5000,() => {
    console.log(`app is running on port 5000`)
})