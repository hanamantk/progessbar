import React, { Component } from 'react';
import Api from './Api.js';
import $ from "jquery";
window.$ = $;

class ProgressBar extends Component {

constructor(props) {
    super(props)
    
    this.handleClick = this.handleClick.bind(this)
    this.dropDownChange= this.dropDownChange.bind(this)
    this.printwidth=0;
   
  }


  componentWillMount(){
  	var self=this;
  	Api.get('',function(data){
  			
  		self.progress=data;
  		
  		self.totalBars=self.progress.bars.length;

  		self.obj={};
	
		for(var i=1;i<=self.totalBars;i++){
		
			self.obj["bar"+i]=0;

		}
  	});
  	
		
  }

  handleClick(e) {

    e.preventDefault();
    var btnValue=e.target.value;
    var btnvalue=parseInt(btnValue,10);
   this.barNo=(this.barNo===undefined)?1:this.barNo;


   this.barwidth =btnvalue;
  
	if(this.barwidth<0){ 

		this.printwidth=this.printwidth+(this.barwidth); //label is nagative
		if (this.printwidth<0) {this.printwidth=0;}
		
	}else{ 
		this.printwidth=this.printwidth+this.barwidth;
	}
 
 	
	var	percent     =(100/230)*(this.barwidth);
	var barno       ='bar'+this.barNo;
		


	this.obj[barno] = this.obj[barno]+percent;
	 var printValue =this.obj[barno].toFixed(0);
	   if(printValue<0){

	    	printValue  =0;
	    	  
	    }
	    var printVal  = printValue+'%';
	   
	 
	var bgcolor=(this.printwidth>230 && printValue>100)?'red':'';

	if(bgcolor==='red'){

		$('#bar'+this.barNo).css({ "background-color": "red",
									"width":'100%'
								
								});
		$('#percent'+this.barNo).html(printVal);


	}else{		

		$('#bar'+this.barNo).css({ "background-color":"green",

								"width" :printVal
							});
		$('#percent'+this.barNo).html(printVal);
		}


  }

  dropDownChange(e){
  	e.preventDefault();
  	
  	this.barNo=parseInt(e.target.value.charAt(9),10);
	this.printwidth=0;
		

  }


  render() {  

  	var self=this;

    return (
      
    <div id='progress-bar'>
			<h1>Progress Bars Demo</h1>
			{
			self.progress.bars.map(function(bar,index){
					
					return <Bars baNno={index+1} />
			})

			}
				<span className="clear"></span>
				<div className="bottum">
				<div >
					<select className="drop" onChange={this.dropDownChange}>
					
					{
						self.progress.bars.map(function(bar,idx){
									
								return <DropDown barCount={idx+1} />
						})

						}
					
					</select>
					</div>
					
					<div className="bars">
					<div className="btns">
						{
						self.progress.buttons.map(function(btn){
									
								return <Buttons btn={btn} handleClick={self.handleClick}/>		
						})

						}
						</div>	
							
					</div>
				</div>
			</div>

    );
  }
}

class Bars extends React.Component{


	render(){ 
		
		return (
				<div key={this.props.bar} className="bar">
					<span id={"percent"+this.props.baNno} className="percent-posn">0%</span>
					<span key={this.props.barNo} id={"bar"+this.props.baNno} className="barcolor" >
					
					</span>
				</div>
		);
	}
}



class DropDown extends React.Component{

	render(){
		return (
				<option id={this.props.barCount} key={this.props.barCount}>#progress{this.props.barCount}</option>
						
		)
	}
}


class Buttons extends React.Component{

	render(){
		return (
				<input key={this.props.btn} type="button" className="btn" value={this.props.btn} onClick={this.props.handleClick}/>
					
		)
	}
}

export default ProgressBar;
