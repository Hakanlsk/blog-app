const postModel = require("../models/postModel")

//create post
const createPostController = async(req, res) => {
    try {
        const {title, description} = req.body
        //validate
        if(!title || !description){
            return res.status(500).send({
                succes:false,
                message:'Please Provide All Fields'
            })
        }
        const post = await postModel({
            title,
            description,
            postedBy: req.auth._id
        }).save();
        res.status(201).send({
            success: true,
            message:'Post created succesfuly',
            post
        })
        console.log(req)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            succes:false,
            message:'Error in Create Post API',
            error
        })
    }
    
}

//GET ALL POSTS
const getAllPostsController = async (req, res) => {
    try {
      const posts = await postModel
        .find()
        .populate("postedBy", "_id name")
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        message: "All Posts Data",
        posts,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In GETALLPOSTS API",
        error,
      });
    }
  };

const getUserPostController = async (req, res) => {
  try {
    /*
    modelden kullanarak MongoDB veritabanında postedBy değeri req içindeki auth nesnesindeki _id ile eşleşen kullanıcının gönderdiği postları arar.
    */ 
    const userPosts = await postModel.find({postedBy:req.auth._id});
    res.status(200).send({
      succes:true,
      message:'user posts',
      userPosts,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      succes:false,
      message:'Error in User POST API',
      error
    })
  }
}


module.exports = {createPostController, getAllPostsController, getUserPostController}