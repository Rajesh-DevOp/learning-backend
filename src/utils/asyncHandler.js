const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

export { asyncHandler };

// const asyncHandler = ( fun) => async (req ,res , next)=>{
//     try {
//         await fun( req ,res , next)
//     } catch (error) {
//         error.status(error.status || 500).json({
//             success:false,
//             message : error.message || "internal server error",

//         })
//     }
// }
