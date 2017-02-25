import React, { Component } from 'react';
//import Api from './Api.js';

class ProgressBar extends Component {

constructor(props) {
    super(props)
    
    this.handleClick = this.handleClick.bind(this)
    this.dropDownChange= this.dropDownChange.bind(this)
    this.state={ barwidth:0,drop:1};
   
  }

  handleClick(e) {

    e.preventDefault();
    var btnValue=e.target.value;
    var val=parseInt(btnValue);

    

    this.setState({

    	barwidth :val
    });

  }

  dropDownChange(e){
  	e.preventDefault();
  	
  	//this.setState({drop:e.target.id})
  }


  render() {

  	var progress={"buttons":[31,23,-31,-46],"bars":[26,39,67,55],"limit":220};
  	
  
  	var j=0;
  	var self=this;

    return (
      
    <div id='progress-bar'>
			<h1>Progress Bars Demo</h1>
			{
			progress.bars.map(function(bar){

					return <Bars bar={bar} barwidth={self.state.barwidth}/>
			})

			}
				<span className="clear"></span>
				<div className="bottum">
				<div >
					<select className="drop" onChange={this.dropDownChange}>
					
					{
						progress.bars.map(function(bar){
									j=j+1;
								return <DropDown barCount={j} />
						})

						}
					
					</select>
					</div>
					
					<div className="bars">
					<div className="btns">
						{
						progress.buttons.map(function(btn){
									
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

constructor(props) {
    super(props)
   
   this.state={ barwidth:this.props.barwidth };
  }

componentWillReceiveProps(nextProps){
	var val=nextProps.barwidth;

	var sign=val[0];
	var nxtval =parseInt(val);
	
	
	
	if(sign==="-"){ 
		this.setState({barwidth:  (this.state.barwidth-nxtval)});
	}else{ 
		this.setState({barwidth: (this.state.barwidth+nxtval) });
	}
 

}

	render(){ 
		var barwidth;
		var bgcolor='';
		
		var	percent=(100/230)*(this.state.barwidth);
			barwidth=percent+'%';
			var bgcolor=(this.state.barwidth>230)?'red':'';

			if(bgcolor==='red'){

				barwidth='100%';
				bgcolor='red';

			}
		
		return (
				<div key={this.props.bar} className="bar">
					<span className="percent-posn">{percent.toFixed(0)}%</span>
					<span key={this.props.bar}  className="barcolor" style={{width:barwidth,background:bgcolor}}>
					
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

constructor(props){
	super(props);
	
}
	

	render(){
		return (
				<input key={this.props.btn} type="button" className="btn" value={this.props.btn} onClick={this.props.handleClick}/>
					
		)
	}
}

export default ProgressBar;
