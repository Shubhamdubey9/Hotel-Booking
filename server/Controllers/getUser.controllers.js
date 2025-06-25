export const getUserData = async (req,res)=>{
   try {
    const role = req.User.role;
    const recentSearchCities = req.user.recentSearchCities;
    res.json({
        success:true,
        role,
        recentSearchCities
    })
   }catch (error){
      res.json({success:false,message:error.message})
   }
}


// Store User Recent Searched Cities
export const storeRecentSearchCities = async (req,res)=>{
try {
    const {recentSearchCities} = req.body;
    const user = await req.User;
    if(user.recentSearchCities < 3 ){
        user.recentSearchCities.push(recentSearchCities)
    }else{
        user.recentSearchCities.shift();
        user.recentSearchCities.push(recentSearchCities)
    }
    await user.save()
    res.json({
        success:true,
        message:"city Added"
    })
} catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    
}
}