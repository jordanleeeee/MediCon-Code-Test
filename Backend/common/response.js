module.exports = function(code, msg){
  var result = {
    resCode: -1,
    resMsg: ''
  }
  if (code !== undefined && msg !== undefined) {
    result.resCode = code
    result.resMsg = msg
  }
  return result
}