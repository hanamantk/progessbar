/*

var Api= {

  BaseUrl: 'http://pb-api.herokuapp.com/bars',

  get: function(data,cb) {
    var self = this;
    $.ajax({
      type: 'GET',
      cache:false,
      url: self.BaseUrl ,
      
      success: function(res) {
         cb(res);
         
        }
    });
  },
  

  getProgressData: function(data,cb){
        this.get(data,cb);
  },

  
}

export default Api;*/