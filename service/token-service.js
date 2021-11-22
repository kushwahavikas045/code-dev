const jwt = require('jsonwebtoken');
const Refresh = require('../models/Refresh');
const accessTokenSecert = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecert = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService{
  
  //genrate token
  genrateToken(payload){
    const accessToken = jwt.sign(payload, accessTokenSecert, {
        expiresIn:'24h',
    });
    
    const refreshToken = jwt.sign(payload, refreshTokenSecert, {
        expiresIn:'1y'
    });

    return{accessToken, refreshToken}
  }

  //store token
  async storeToken(token, userId){
      try {
          await Refresh.create({
              token,
              userId
          })
          
      } catch (error) {
          console.log(error);
      }
  }

  async verifyAccessToken(token){
      return jwt.verify(token, accessTokenSecert);
  }
  async verifyRefreshToken(token){
    return jwt.verify(token, refreshTokenSecert);
}

async findRefreshToken(userId, refreshToken) {
 return await Refresh.findOne({
     userId: userId,
     token: refreshToken,
 });
}

async updateRefreshToken(userId, refreshToken) {
 return await Refresh.updateOne(
     { userId: userId },
     { token: refreshToken }
 );
}

async removeRefreshToken(refreshToken){
    return await Refresh.deleteOne({token : refreshToken});
}

}

module.exports = new TokenService();