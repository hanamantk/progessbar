import $ from "jquery";

var Api= {

  get: function(data,cb) {
    var self = this;
    $.ajax({
      type: 'GET',
      cache:false,
      async:false,
      url: "http://pb-api.herokuapp.com/bars" ,
      
      success: function(res) {
         cb(res);
         
        }
    });
  }

  
}

export default Api;